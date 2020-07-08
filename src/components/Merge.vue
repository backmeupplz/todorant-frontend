<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("merge.title") }}
    v-card-text
      p(v-html='$t("merge.description")') 
      p(v-if='done') {{ $t("merge.done") }}
    v-layout.text-center(column, justify-center, align-center)
      vue-telegram-login(
        mode='callback',
        telegram-login='todorant_bot',
        @callback='onTelegramAuth',
        radius='3',
        :userpic='false',
        v-if='!user || !user.telegramId'
      )
      g-signin-button(
        :params='{ client_id: googleClientId }',
        @success='onGoogleSignInSuccess',
        @error='onGoogleSignInError',
        v-if='!user || !user.email'
      ) {{ $t("home.google") }}
      fb-signin-button(
        :params='{ scope: "email", return_scopes: true }',
        @success='onFacebookSignInSuccess',
        @error='onFacebookSignInError',
        v-if='!user || !user.facebookId'
      ) {{ $t("home.facebook") }}
    v-card-actions
      v-spacer
      v-btn(
        color='blue',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey='close',
        :loading='loading'
      ) {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
const { vueTelegramLogin } = require('vue-telegram-login')
import { mergeFacebook, mergeTelegram, mergeGoogle } from '@/utils/api'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    vueTelegramLogin,
  },
})
export default class Merge extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  @UserStore.State user?: User
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false

  get done() {
    const user = this.user
    if (!user) {
      return false
    }
    return !!user.email && !!user.facebookId && !!user.telegramId
  }
  get googleClientId() {
    return '599005831909-krrl1m3k011n7qdrkv1voio9cgdv7a0t.apps.googleusercontent.com'
  }

  async onFacebookSignInSuccess(response: any) {
    this.loading = true
    try {
      if (!this.user) {
        return
      }
      if (
        !confirm(
          i18n.t('merge.confirm', {
            id: response.authResponse.userID,
          }) as string
        )
      ) {
        return
      }
      await mergeFacebook(this.user, response.authResponse.accessToken)
    } catch (err) {
      this.setSnackbarError('errors.login.facebook')
    } finally {
      this.loading = false
    }
  }
  onFacebookSignInError(error: Error) {
    this.setSnackbarError('errors.login.facebook')
  }
  async onGoogleSignInSuccess(googleUser: any) {
    this.loading = true
    try {
      if (!this.user) {
        return
      }
      const email = googleUser.getBasicProfile().getEmail()
      if (
        !confirm(
          i18n.t('merge.confirm', {
            id: email,
          }) as string
        )
      ) {
        return
      }
      await mergeGoogle(this.user, googleUser.getAuthResponse().id_token)
    } catch (err) {
      this.setSnackbarError('errors.login.google')
    } finally {
      this.loading = false
    }
  }
  onGoogleSignInError(error: Error) {
    this.setSnackbarError('errors.login.google')
  }
  async onTelegramAuth(loginInfo: any) {
    this.loading = true
    try {
      if (!this.user) {
        return
      }
      if (
        !confirm(
          i18n.t('merge.confirm', {
            id: loginInfo.id,
          }) as string
        )
      ) {
        return
      }
      await mergeTelegram(this.user, loginInfo)
    } catch (err) {
      this.setSnackbarError('errors.login.telegram')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style>
.fb-signin-button {
  cursor: pointer;
  display: block;
  padding: 10px 46px;
  border-radius: 3px;
  background-color: #647daf;
  color: #fff;
  margin: 10px;
}
.g-signin-button {
  margin: 10px;
  cursor: pointer;
  display: block;
  padding: 10px 46px;
  border-radius: 3px;
  background-color: #ce5658;
  color: #fff;
}
</style>
