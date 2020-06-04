<template lang="pug">
  .v-container.pa-4.d-flex.justify-center
    .loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as store from '../plugins/store'
import * as api from '../utils/api'
import { i18n } from '../plugins/i18n'

@Component
export default class GoogleCalendarSetup extends Vue {
  async mounted() {
    const user = store.user()
    if (!user) {
      return
    }
    if (
      this.$route.query &&
      this.$route.query.code &&
      typeof this.$route.query.code === 'string'
    ) {
      try {
        const googleCredentials = await api.authorizeGoogleCalendar(
          user,
          decodeURIComponent(this.$route.query.code)
        )
        const settings = store.userState().settings
        settings.googleCalendarCredentials = googleCredentials
        await api.setSettings(user, settings)
        this.$router.replace('/superpower')
        store.setSnackbarSuccess(
          i18n.t('googleCalendarEnableSuccess') as string
        )
      } catch (err) {
        this.$router.replace('/superpower')
        store.setSnackbarError(err.response ? err.response.data : err.message)
      }
    } else {
      window.location.href =
        process.env.VUE_APP_WEBSITE || 'https://todorant.com'
    }
  }
}
</script>

<style>
.loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
