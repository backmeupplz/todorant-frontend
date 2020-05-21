<template lang="pug">
  div
    v-snackbar(
      app
      v-model='active'
      :timeout='4000'
      top
      :color='color'
      flat
    )
      span {{text}}
      v-btn(
        color='white'
        text
        @click='active = false'
      ) {{$t('close')}}
    v-snackbar(
      app
      v-model='refreshActive'
      bottom
      flat
      :timeout='0'
    )
      span {{$t('refreshRequest')}}
      v-btn(
        color='white'
        @click='reload'
        text
      ) {{$t('refresh')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '../plugins/i18n'
import * as store from '../plugins/store'
import * as api from '../utils/api'

@Component
export default class Snackbar extends Vue {
  get active() {
    return store.snackbar().active
  }
  set active(newValue: Boolean) {
    store.hideSnackbar()
  }
  get color() {
    return store.snackbar().color
  }
  get text() {
    const msg = store.snackbar().message
    return typeof msg === 'string'
      ? msg === 'Internal Server Error'
        ? i18n.t('errors.internal')
        : i18n.t(store.snackbar().message.toString())
      : (msg as any)[i18n.locale]
  }

  refreshActive = false
  version = '1.0.0'

  async mounted() {
    this.version = await api.getVersion()

    setInterval(async () => {
      const version = await api.getVersion()
      if (this.version !== version) {
        this.refreshActive = true
      }
    }, 60 * 1000)
  }

  reload() {
    window.location.reload()
  }
}
</script>
