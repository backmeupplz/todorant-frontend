<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='closeAndDropUserNameMenu'
)
  v-card
    v-card-title {{ $t("settings.title") }}
    v-card-text
      v-subheader.pa-0 {{ $t("settings.general") }}
      v-switch.ma-0.pa-0(
        :label='$t("settings.showTodayOnAddTodo")',
        v-model='safeShowTodayOnAddTodo'
      )
      v-switch.ma-0.pa-0(
        :label='$t("settings.newTodosGoFirst")',
        v-model='safeNewTodosGoFirst'
      )
      v-switch.ma-0.pa-0(
        :label='$t("settings.preserveOrderByTime")',
        v-model='safePreserveOrderByTime'
      )
      v-switch.ma-0.pa-0(
        :label='$t("settings.duplicateTagInBreakdown")',
        v-model='safeDuplicateTagInBreakdown'
      )
      v-switch.ma-0.pa-0(:label='$t("soundEffects")', v-model='soundEffects')
      v-switch.ma-0.pa-0(:label='$t("settings.hotkeys")', v-model='hotKeys')
      v-switch.ma-0.pa-0(:label='$t("settings.swipeActions")', v-model='swipeActions')
      v-switch.ma-0.pa-0(:label='$t("settings.coloredCardBackgrounds")', v-model='coloredCardBackgroundsValue')
      v-divider
      v-select.mt-4(
        :items='weekdays',
        :label='$t("settings.firstDayOfWeek")',
        v-model='safeFirstDayOfWeek'
      )
      v-row
        v-col(cols='12', md='16')
          v-menu(
            ref='menu',
            v-model='timeMenu',
            :close-on-content-click='false',
            :return-value.sync='safeStartTimeOfDay',
            min-width=0
          )
            template(v-slot:activator='{ on }')
              v-text-field(
                clearable,
                v-model='safeStartTimeOfDay',
                :label='$t("settings.startTimeOfDay")',
                prepend-icon='access_time',
                readonly,
                v-on='on'
              )
            v-time-picker(
              v-model='safeStartTimeOfDay',
              format='24hr',
              :close-on-content-click='false'
            )
              v-spacer
              v-btn(
                text,
                color='green',
                @click='$refs.menu.save(safeStartTimeOfDay)'
              ) Ok
              v-btn(text, color='blue', @click='timeMenu = false') Close

      v-divider
      v-subheader.pa-0 {{ $t("settings.integrations") }}
      .d-flex.flex-column
        .integration-button-block.mb-2
          span {{ $t("settings.googleCalendar") }}
          v-btn(
            v-if='googleCalendarConnected()',
            color='error',
            text,
            :loading='loading',
            @click='disconnectGoogleCalendar'
          ) {{ $t("settings.connected") }}
          v-btn(
            v-else,
            :loading='loading',
            @click='connectGoogleCalendar',
            color='#FFFFFF'
          )
            img.google-button-img(
              src='/img/google.svg',
              height='18dp',
              width='18dp'
            )
            span.google-button-text {{ $t("settings.notConnected") }}
        .integration-button-block.mb-2(v-if='!!user && !user.telegramId')
          span {{ $t("settings.telegram") }}
          v-layout.text-center(column, justify-center, align-center)
          vue-telegram-login(
            mode='callback',
            telegram-login='todorant_bot',
            @callback='onTelegramAuth',
            radius='3',
            :userpic='false',
            v-if='!user || !user.telegramId'
          )
      v-divider
      v-subheader.pa-0 {{ $t("settings.account") }}
      .d-flex.flex-column
        span(v-if='!userNameMenu') {{ name }}
          v-btn.ma-1(small, icon, @click='userNameMenu = true') 
            v-icon(:color='dark ? "grey lighten-1" : "grey darken-1"', small) edit
        v-text-field(
          v-else,
          v-model='name',
          :label='$t("settings.username")',
          :loading='loading',
          :append-outer-icon='(checkUserName(name) ? "done" : undefined)',
          :append-icon='"clear"',
          @click:append-outer='changeUserName',
          @click:append='clearUserName'
        )
        span(v-for='identifier in identifiers') {{ identifier }}
      v-divider.my-2
      .d-flex.flex-column.align-start
        v-btn(
          text,
          :loading='loading',
          @click='saveExportedTodos',
          color='blue'
        ) {{ $t("settings.export") }}
        v-btn(color='blue', text, @click='encryptionTouched') {{ $t("encryption.title") }}
    v-card-actions.d-flex.flex-column(v-if='this.$vuetify.breakpoint.xsOnly')
      v-btn(
        color='error',
        text,
        @click='closeAndDropUserNameMenu',
        v-shortkey.once='["esc"]',
        @shortkey.native='closeAndDropUserNameMenu',
        :loading='loading'
      ) {{ $t("close") }}
      v-btn(
        color='blue',
        text,
        @click='save',
        @shortkey.native='closeAndDropUserNameMenu',
        :loading='loading'
      ) {{ $t("save") }}
    v-card-actions(v-else)
      v-spacer
      v-btn(
        color='error',
        text,
        @click='closeAndDropUserNameMenu',
        v-shortkey.once='["esc"]',
        @shortkey.native='closeAndDropUserNameMenu',
        :loading='loading'
      ) {{ $t("close") }}
      v-btn(color='blue', text, @click='save', :loading='loading') {{ $t("save") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { i18n } from '@/plugins/i18n'
import { getTodos, getTodosForExport, mergeTelegram } from '@/utils/api'
import axios from 'axios'
import { User } from '@/models/User'
import { saveAs } from 'file-saver'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const { vueTelegramLogin } = require('vue-telegram-login')
import { GoogleCalendarCredentials } from '@/models/GoogleCalendarCredentials'
import store from '@/store'
import App from '@/App.vue'

const UserStore = namespace('UserStore')
const SettingsStore = namespace('SettingsStore')
const SnackbarStore = namespace('SnackbarStore')
const AppStore = namespace('AppStore')

@Component({
  components: {
    vueTelegramLogin,
  },
})
export default class Settings extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) openEncryption!: () => void

  @UserStore.State user?: User
  @UserStore.Mutation setUserName!: (name: string) => void
  @UserStore.Mutation setTelegramId!: (telegramId: string) => void

  @AppStore.State language?: string
  @AppStore.State dark!: boolean

  @SettingsStore.State showTodayOnAddTodo?: boolean
  @SettingsStore.State firstDayOfWeek?: number
  @SettingsStore.State startTimeOfDay?: string
  @SettingsStore.State newTodosGoFirst?: boolean
  @SettingsStore.State preserveOrderByTime?: boolean
  @SettingsStore.State duplicateTagInBreakdown?: boolean
  @SettingsStore.State audioEnabled!: boolean
  @SettingsStore.State hotKeysEnabled!: boolean
  @SettingsStore.State swipeActionsEnabled!: boolean
  @SettingsStore.State coloredCardBackgrounds!: boolean
  @SettingsStore.State googleCalendarCredentials!: GoogleCalendarCredentials
  @SettingsStore.Mutation setShowTodayOnAddTodo!: (
    hotsetHotKeysEnabled: boolean
  ) => void
  @SettingsStore.Mutation setFirstDayOfWeek!: (firstDayOfWeek: number) => void
  @SettingsStore.Mutation setStartTimeOfDay!: (startTimeOfDay: string) => void
  @SettingsStore.Mutation setNewTodosGoFirst!: (
    newTodosGoFirst: boolean
  ) => void
  @SettingsStore.Mutation setPreserveOrderByTime!: (
    preserveOrderByTime: boolean
  ) => void
  @SettingsStore.Mutation setDuplicateTagInBreakdown!: (
    duplicateTagInBreakdown: boolean
  ) => void
  @SettingsStore.Mutation setAudioEnabled!: (audioEnabled: boolean) => void
  @SettingsStore.Mutation setHotKeysEnabled!: (hotKeysEnabled: boolean) => void
  @SettingsStore.Mutation setSwipeActionsEnabled!: (
    swipeActionsEnabled: boolean
  ) => void
  @SettingsStore.Mutation setСoloredCardBackgrounds!: (
    coloredCardBackgrounds: boolean
  ) => void

  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @SnackbarStore.Mutation setSnackbarSuccess!: (message: string) => void

  loading = false
  timeMenu = false
  userNameMenu = false

  name = ''

  weekdays = [1, 2, 3, 4, 5, 6, 0].map((n) => ({
    text: i18n.t(`weekday${n}`),
    value: n,
  }))

  get identifiers() {
    const user = this.user
    if (!user) {
      return ''
    }
    return [
      user.email,
      user.facebookId,
      user.telegramId,
      user.appleSubId,
    ].filter((v) => !!v)
  }

  get safeShowTodayOnAddTodo() {
    return this.showTodayOnAddTodo || false
  }
  set safeShowTodayOnAddTodo(val: boolean) {
    this.setShowTodayOnAddTodo(val)
  }

  get safeFirstDayOfWeek() {
    const storeFirstDayOfWeek = this.firstDayOfWeek
    return storeFirstDayOfWeek === undefined
      ? this.language === 'en'
        ? 0
        : 1
      : storeFirstDayOfWeek
  }
  set safeFirstDayOfWeek(val: number) {
    this.setFirstDayOfWeek(val)
  }

  get safeStartTimeOfDay() {
    const storeStartTimeOfDay = this.startTimeOfDay
    return storeStartTimeOfDay ? storeStartTimeOfDay : '00:00'
  }
  set safeStartTimeOfDay(val: any) {
    this.setStartTimeOfDay(val ? val : '00:00')
  }

  get safeNewTodosGoFirst() {
    return this.newTodosGoFirst || false
  }
  set safeNewTodosGoFirst(val: boolean) {
    this.setNewTodosGoFirst(val)
  }

  get safePreserveOrderByTime() {
    return this.preserveOrderByTime || false
  }
  set safePreserveOrderByTime(val: boolean) {
    this.setPreserveOrderByTime(val)
  }
  get safeDuplicateTagInBreakdown() {
    return this.duplicateTagInBreakdown || false
  }
  set safeDuplicateTagInBreakdown(val: boolean) {
    this.setDuplicateTagInBreakdown(val)
  }
  get soundEffects() {
    return this.audioEnabled
  }
  set soundEffects(val: boolean) {
    this.setAudioEnabled(val)
  }
  get hotKeys() {
    return this.hotKeysEnabled
  }
  set hotKeys(val: boolean) {
    this.setHotKeysEnabled(val)
  }
  get swipeActions() {
    return this.swipeActionsEnabled
  }
  set swipeActions(val: boolean) {
    this.setSwipeActionsEnabled(val)
  }
  get coloredCardBackgroundsValue() {
    return this.coloredCardBackgrounds
  }
  set coloredCardBackgroundsValue(val: boolean) {
    this.setСoloredCardBackgrounds(val)
  }

  checkUserName(name: any) {
    if (!!name && name.length <= 250) return true
    return false
  }

  changeUserName() {
    this.userNameMenu = false
    if (!this.user) {
      return
    }
    this.setUserName(this.name)
    return
  }

  clearUserName() {
    this.userNameMenu = false
    if (!this.user) {
      return
    }
    this.name = this.user.name
    return
  }

  closeAndDropUserNameMenu() {
    this.userNameMenu = false
    if (!!this.user) {
      this.name = this.user.name
    }
    this.close()
  }

  googleCalendarConnected() {
    return !!this.googleCalendarCredentials
  }

  async connectGoogleCalendar() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    this.userNameMenu = false
    this.name = user.name
    try {
      const url = await api.getCalendarAuthenticationURL(user)
      window.location.href = url
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async disconnectGoogleCalendar() {
    if (!confirm(i18n.t('settings.disconnectConfirm') as string)) {
      return
    }
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    this.userNameMenu = false
    this.name = user.name
    try {
      await api.setSettings(user, {
        googleCalendarCredentials: null,
      })
      serverBus.$emit('refreshRequested')
      ;(this as any).close()
      this.setSnackbarSuccess(i18n.t('googleCalendarDisableSuccess') as string)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async onTelegramAuth(loginInfo: any) {
    this.loading = true
    try {
      if (!this.user) {
        return
      }
      const { telegramId } = await mergeTelegram(this.user, loginInfo)
      this.setTelegramId(telegramId)
      this.setSnackbarSuccess('success')
    } catch (err) {
      this.setSnackbarError('errors.login.telegram')
    } finally {
      this.loading = false
    }
  }

  async save() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    this.userNameMenu = false
    this.name = user.name
    try {
      await api.setSettings(user, {
        ...store.state.SettingsStore,
      })
      await api.setUserName(user, {
        name: this.name,
      })
      serverBus.$emit('refreshRequested')
      ;(this as any).close()
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  encryptionTouched() {
    this.openEncryption()
    this.close()
  }

  created() {
    if (!this.user) {
      return
    }
    this.name = this.user.name
  }

  async saveExportedTodos() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    this.userNameMenu = false
    this.name = user.name
    try {
      const file = await getTodosForExport(user)
      const blob = new Blob([file])
      saveAs(blob, 'todo.txt')
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style>
.google-button-img {
  margin-right: 24px !important;
}
.google-button-text {
  color: rgba(0, 0, 0, 0.54) !important;
}
.integration-button-block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
/* Responsiveness */
@media only screen and (max-width: 500px) {
  .integration-button-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
