<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
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
      v-divider
      v-select.mt-4(
        :items='weekdays',
        :label='$t("settings.firstDayOfWeek")',
        v-model='safeFirstDayOfWeek'
      )
      v-divider
      v-subheader.pa-0 {{ $t("settings.integrations") }}
      .d-flex.justify-space-between.align-center.mb-2
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
      v-divider
      v-subheader.pa-0 {{ $t("settings.account") }}
      .d-flex.flex-column
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
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey='close',
        :loading='loading'
      ) {{ $t("close") }}
      v-btn(
        color='blue',
        text,
        @click='save',
        @shortkey='close',
        :loading='loading'
      ) {{ $t("save") }}
    v-card-actions(v-else)
      v-spacer
      v-btn(
        color='error',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey='close',
        :loading='loading'
      ) {{ $t("close") }}
      v-btn(
        color='blue',
        text,
        @click='save',
        @shortkey='close',
        :loading='loading'
      ) {{ $t("save") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { i18n } from '@/plugins/i18n'
import { getTodos, getTodosForExport } from '@/utils/api'
import axios from 'axios'
import { User } from '@/models/User'
import { saveAs } from 'file-saver'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { GoogleCalendarCredentials } from '@/models/GoogleCalendarCredentials'
import store from '@/store'
import App from '@/App.vue'

const UserStore = namespace('UserStore')
const SettingsStore = namespace('SettingsStore')
const SnackbarStore = namespace('SnackbarStore')
const AppStore = namespace('AppStore')

@Component
export default class Settings extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) openEncryption!: () => void

  @UserStore.State user?: User

  @AppStore.State language?: string

  @SettingsStore.State showTodayOnAddTodo?: boolean
  @SettingsStore.State firstDayOfWeek?: number
  @SettingsStore.State newTodosGoFirst?: boolean
  @SettingsStore.State preserveOrderByTime?: boolean
  @SettingsStore.State duplicateTagInBreakdown?: boolean
  @SettingsStore.State audioEnabled!: boolean
  @SettingsStore.State hotKeysEnabled!: boolean
  @SettingsStore.State googleCalendarCredentials!: GoogleCalendarCredentials
  @SettingsStore.Mutation setShowTodayOnAddTodo!: (
    hotsetHotKeysEnabled: boolean
  ) => void
  @SettingsStore.Mutation setFirstDayOfWeek!: (firstDayOfWeek: number) => void
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

  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @SnackbarStore.Mutation setSnackbarSuccess!: (message: string) => void

  loading = false

  weekdays = [1, 2, 3, 4, 5, 6, 0].map((n) => ({
    text: i18n.t(`weekdays.${n}`),
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

  googleCalendarConnected() {
    return !!this.googleCalendarCredentials
  }

  async connectGoogleCalendar() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
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
    try {
      await api.setSettings(user, {
        googleCalendarCredentials: undefined,
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

  async save() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.setSettings(user, {
        ...store.state.SettingsStore,
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

  async saveExportedTodos() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
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
</style>
