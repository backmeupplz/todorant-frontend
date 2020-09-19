<template lang="pug">
v-dialog(v-model='safeDialog', max-width='600')
  v-card
    v-card-text.pt-4.d-flex.flex-column.justify-center.align-center
      // Facebook
      fb-signin-button(
        :params='{ scope: "email", return_scopes: true }',
        @success='onFacebookSignInSuccess',
        @error='onFacebookSignInError'
      ) {{ $t("home.facebook") }}
      v-btn.google-button(color='#FFFFFF', @click='loginWithGoogle')
        img.google-button-img(
          src='/img/google.svg',
          height='18dp',
          width='18dp'
        )
        span {{ $t("home.google") }}
      // Apple
      vue-apple-signin.signin-button.pb-3
      // Telegram
      vue-telegram-login(
        mode='callback',
        telegram-login='todorant_bot',
        @callback='onTelegramAuth',
        radius='3',
        :userpic='false'
      )
      // Debug login by token
      div(v-if='debug')
        v-text-field(
          label='Debug token login',
          v-model='debugToken',
          append-icon='send',
          @click:append='debugTokenLogin'
        )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import {
  loginFacebook,
  loginTelegram,
  loginGoogle,
  loginApple,
  loginToken,
} from '@/utils/api'
import { User } from '@/models/User'
import { logEvent } from '@/utils/logEvent'
import { setCookie } from '@/utils/cookie'
const { vueTelegramLogin } = require('vue-telegram-login')
import { serverBus } from '@/main'
import * as firebase from 'firebase/app'
import 'firebase/auth'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

// FB object is global, declaring here for TS
declare const FB: any

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.email')
googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.profile')

@Component({
  components: {
    vueTelegramLogin,
  },
})
export default class SigninDialog extends Vue {
  @Prop({ required: true }) readonly dialog!: boolean
  @Prop({ required: true }) readonly close!: () => void

  @UserStore.Mutation setUser!: (user: User) => void
  @UserStore.State user?: User
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  debugToken = ''

  get safeDialog() {
    return this.dialog
  }
  set safeDialog(newValue: boolean) {
    if (!newValue) {
      this.close()
    }
  }

  get debug() {
    return !!process.env.VUE_APP_DEV
  }

  get googleClientId() {
    return process.env.VUE_APP_GOOGLE_CLIENT_ID
  }

  created() {
    if (this.$route.query && this.$route.query.hash) {
      if (!this.user) {
        this.onTelegramAuth(this.$route.query)
      }
    } else if (this.$route.query && this.$route.query.apple) {
      if (!this.user) {
        this.onAppleAuth(JSON.parse(this.$route.query.apple as string))
      }
    }

    this.checkSignIn()
  }

  async onFacebookSignInSuccess(response: any) {
    try {
      const user = await loginFacebook(response.authResponse.accessToken)
      this.loginSuccess(user, 'facebook')
    } catch (error) {
      this.loginError(error, 'facebook')
    }
  }
  onFacebookSignInError(error: Error) {
    this.loginError(error, 'facebook')
  }

  loginWithGoogle() {
    firebase.auth().signInWithRedirect(googleAuthProvider)
  }

  async checkSignIn() {
    const redirectResult = await firebase.auth().getRedirectResult()
    console.log(JSON.stringify(redirectResult, undefined, 2))
    if (redirectResult.credential) {
      if (redirectResult.credential.signInMethod === 'google.com') {
        const token = (redirectResult.credential as any).oauthIdToken
        try {
          const user = await loginGoogle(token)
          this.loginSuccess(user, 'google')
        } catch (error) {
          this.loginError(error, 'google')
        }
      }
    }
  }

  async onTelegramAuth(loginInfo: any) {
    try {
      const user = await loginTelegram(loginInfo)
      this.loginSuccess(user, 'telegram')
    } catch (error) {
      this.loginError(error, 'telegram')
    }
  }

  async onAppleAuth(loginInfo: any) {
    try {
      const user = await loginApple(loginInfo)
      this.loginSuccess(user, 'apple')
    } catch (error) {
      this.loginError(error, 'apple')
    }
  }

  loginError(error: Error, provider: string) {
    console.error(error)
    this.setSnackbarError(`errors.login.${provider}`)
    logEvent('login_error', { provider, error: error.message })
  }

  loginSuccess(user: User, provider: string) {
    this.setUser(user)
    setCookie('token', user.token!)
    this.close()
    this.$router.replace('superpower')
    logEvent('login_success', { provider })
    serverBus.$emit('login')
  }

  async debugTokenLogin() {
    try {
      const user = await loginToken(this.debugToken)
      this.loginSuccess(user, 'debug_token')
    } catch (error) {
      this.loginError(error, 'debug_token')
    }
  }
}
</script>

<style>
.fb-signin-button {
  margin: 10px 0px;
  width: 239px;
}
.signin-button {
  width: 239px;
  height: 44px;
  cursor: pointer;
  display: block;
  border-radius: 3px;
  size: 14px;
}
.google-button {
  background-color: white;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.54) !important;
  size: 14px !important;
  font-family: 'Roboto-Medium' !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
  padding-left: 8px !important;
}
.google-button-img {
  margin-right: 24px !important;
}
@media only screen and (max-width: 960px) {
  .signin-button {
    margin: 10px auto 10px;
  }
  .fb-signin-button {
    margin: 10px auto 10px;
  }
}
</style>
