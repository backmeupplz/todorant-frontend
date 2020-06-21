<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  @click:outside='close')
    v-card
      v-card-title {{$t('settings.title')}}
      v-card-text
        v-subheader.pa-0 {{$t('settings.general')}}
        v-switch.ma-0.pa-0(
          :label='$t("settings.showTodayOnAddTodo")'
          v-model='showTodayOnAddTodo'
        )
        v-switch.ma-0.pa-0(
          :label='$t("settings.newTodosGoFirst")'       v-model='newTodosGoFirst'
        )
        v-switch.ma-0.pa-0(
          :label='$t("settings.preserveOrderByTime")'
          v-model='preserveOrderByTime'
        )
        v-switch.ma-0.pa-0(
          :label='$t("settings.duplicateTagInBreakdown")'
          v-model='duplicateTagInBreakdown'
        )
        v-switch.ma-0.pa-0(
          :label='$t("soundEffects")'
          v-model='soundEffects'
        )
        v-divider
        v-select.mt-4(
          :items='weekdays'
          :label='$t("settings.firstDayOfWeek")'
          v-model='firstDayOfWeek'
        )
        v-divider
        v-subheader.pa-0 {{$t('settings.integrations')}}
        .d-flex.justify-space-between.align-center.mb-2
          span {{$t('settings.googleCalendar')}}
          v-btn(
            v-if='googleCalendarConnected()'
            color='error'
            text
            :loading='loading'
            @click='disconnectGoogleCalendar'
          ) {{$t('settings.connected')}}
          v-btn(
            v-else
            :loading='loading'
            @click='connectGoogleCalendar'
            color='#FFFFFF'
          )
            img.google-button-img(
              src='/img/google.svg'
              height='18dp'
              width='18dp'
            )
            span.google-button-text {{$t('settings.notConnected')}}
        v-divider
        v-subheader.pa-0 {{$t('settings.account')}}
        .d-flex.flex-column
          span(
            v-for='identifier in identifiers'
          ) {{identifier}}
          v-btn(
            text
            @click='saveExportedTodos'
            color='blue'
          ) {{$t('Экспорт туду')}}
      v-card-actions.d-flex.flex-column(
        v-if='this.$vuetify.breakpoint.xsOnly'
      )
        v-btn(
          color='blue'
          text
          @click='encryptionTouched'
        ) {{$t('encryption.title')}}
        v-spacer
        v-btn(
          color='error'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
          :loading='loading'
        ) {{$t('close')}}
        v-btn(
          color='blue'
          text 
          @click='save'
          @shortkey='close'
          :loading='loading'
        ) {{$t('save')}}
      v-card-actions(v-else)
        v-btn(
          color='blue'
          text
          @click='encryptionTouched'
        ) {{$t('encryption.title')}}
        v-spacer
        v-btn(
          color='error'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
          :loading='loading'
        ) {{$t('close')}}
        v-btn(
          color='blue'
          text 
          @click='save'
          @shortkey='close'
          :loading='loading'
        ) {{$t('save')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as store from '../plugins/store'
import * as api from '../utils/api'
import { serverBus } from '../main'
import { i18n } from '../plugins/i18n'
import { getTodos } from '../utils/api'
import { exportTodos, generateTodosBlob } from '../utils/api'
import axios from 'axios'
import { User } from '../models/user'

@Component({
  props: {
    dialog: Boolean,
    close: Function,
    openEncryption: Function,
  },
})
export default class Settings extends Vue {
  loading = false

  weekdays = [1, 2, 3, 4, 5, 6, 0].map((n) => ({
    text: i18n.t(`weekdays.${n}`),
    value: n,
  }))

  get identifiers() {
    const user = store.user()
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

  get showTodayOnAddTodo() {
    return store.userState().settings.showTodayOnAddTodo || false
  }
  set showTodayOnAddTodo(val: boolean) {
    store.userState().settings.showTodayOnAddTodo = val
  }

  get firstDayOfWeek() {
    const storeFirstDayOfWeek = this.$store.state.userState.settings
      .firstDayOfWeek
    return storeFirstDayOfWeek === undefined
      ? this.$store.state.language === 'en'
        ? 0
        : 1
      : storeFirstDayOfWeek
  }
  set firstDayOfWeek(val: number) {
    store.userState().settings.firstDayOfWeek = val
  }

  get newTodosGoFirst() {
    return this.$store.state.userState.settings.newTodosGoFirst
  }
  set newTodosGoFirst(val: boolean) {
    store.userState().settings.newTodosGoFirst = val
  }

  get preserveOrderByTime() {
    return this.$store.state.userState.settings.preserveOrderByTime
  }
  set preserveOrderByTime(val: boolean) {
    store.userState().settings.preserveOrderByTime = val
  }

  get duplicateTagInBreakdown() {
    return this.$store.state.userState.settings.duplicateTagInBreakdown
  }

  set duplicateTagInBreakdown(val: boolean) {
    store.userState().settings.duplicateTagInBreakdown = val
  }

  get soundEffects() {
    return this.$store.state.audioEnabled
  }
  set soundEffects(val: boolean) {
    store.setAudioEnabled(val)
  }

  googleCalendarConnected() {
    return !!store.userState().settings.googleCalendarCredentials
  }

  async connectGoogleCalendar() {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      const url = await api.getCalendarAuthenticationURL(user)
      window.location.href = url
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async disconnectGoogleCalendar() {
    if (!confirm(i18n.t('settings.disconnectConfirm') as string)) {
      return
    }
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      const settings = store.userState().settings
      settings.googleCalendarCredentials = undefined
      await api.setSettings(user, settings)
      serverBus.$emit('refreshRequested')
      ;(this as any).close()
      store.setSnackbarSuccess(i18n.t('googleCalendarDisableSuccess') as string)
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async save() {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.setSettings(user, store.userState().settings)
      serverBus.$emit('refreshRequested')
      ;(this as any).close()
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  encryptionTouched() {
    this.$props.openEncryption()
    this.$props.close()
  }

  async saveExportedTodos() {
    const user = store.user()

    if (!user) {
      return
    }

    const fileData = await exportTodos(user)

    if (!fileData) {
      return
    }

    const downloadData = await generateTodosBlob(fileData.data)
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
