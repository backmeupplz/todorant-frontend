<template lang="pug">
.v-container.pa-4.d-flex.justify-center
  Loader
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as api from '@/utils/api'
import { i18n } from '@/plugins/i18n'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { GoogleCalendarCredentials } from '@/models/GoogleCalendarCredentials'
import Loader from '@/components/Loader.vue'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    Loader,
  },
})
export default class DelegationInvite extends Vue {
  @UserStore.State user?: User
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @SnackbarStore.Mutation setSnackbarSuccess!: (message: string) => void

  async mounted() {
    const token = this.$route.path.replace('/invite/', '')
    if (!this.user) {
      this.$router.replace('/superpower')
      return
    }
    if (!confirm(i18n.t('delegate.inviteConfirm') as string)) {
      this.$router.replace('/superpower')
      return
    }
    if (token) {
      try {
        await api.useDelegateToken(this.user, token)
        this.$router.replace('/superpower')
        this.setSnackbarSuccess(i18n.t('delegate.inviteSuccess') as string)
      } catch (err) {
        this.$router.replace('/superpower')
        this.setSnackbarError(i18n.t('errors.delegate.invalidToken') as string)
      }
    } else {
      window.location.href =
        import.meta.env.VITE_VUE_APP_WEBSITE || 'https://todorant.com'
    }
  }
}
</script>
