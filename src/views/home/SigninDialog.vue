<template lang="pug">
v-dialog(v-model='safeDialog', width='unset')
  v-card.sign-in-container
    .button-container
      .width-container
        // Facebook
        v-btn.signin-button.signin-facebook(@click='loginWithFacebook')
          img.logo-image(src='/img/facebook.svg', height='18dp', width='18dp')
          span {{ $t("home.facebook") }}
        // Google
        v-btn.signin-button.signin-google(
          color='#FFFFFF',
          @click='loginWithGoogle'
        )
          img.logo-image(src='/img/google.svg', height='18dp', width='18dp')
          span {{ $t("home.google") }}
        // Apple
        v-btn.signin-button.signin-apple(
          color='#000000',
          @click='loginWithApple'
        )
          img.logo-image(src='/img/apple.svg', height='18dp', width='18dp')
          span {{ $t("home.apple") }}

        // Telegram
        vue-telegram-login.signin-telegram(
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

  async created() {
    // Telegram auth
    if (this.$route.query && this.$route.query.hash) {
      if (!this.user) {
        this.onTelegramAuth(this.$route.query)
      }
    }
    // Google auth
    try {
      const result = await firebase.auth().getRedirectResult()
      if (result.credential) {
        const token = (result.credential as any).accessToken
        const user = await loginGoogle(token)
        this.loginSuccess(user, 'google')
      }
    } catch (error) {
      this.loginError(error, 'google')
    }
  }

  async loginWithGoogle() {
    const authProvider = new firebase.auth.GoogleAuthProvider()
    authProvider.addScope('email')
    authProvider.addScope('profile')
    await firebase.auth().signInWithRedirect(authProvider)
  }

  async loginWithFacebook() {
    const authProvider = new firebase.auth.FacebookAuthProvider()
    authProvider.addScope('email')
    try {
      const result = await firebase.auth().signInWithPopup(authProvider)
      const token = (result.credential as any).accessToken
      const user = await loginFacebook(token)
      this.loginSuccess(user, 'facebook')
    } catch (error) {
      this.loginError(error, 'facebook')
    }
  }

  async loginWithApple() {
    const authProvider = new firebase.auth.OAuthProvider('apple.com')
    authProvider.addScope('email')
    authProvider.addScope('name')
    try {
      const result = await firebase.auth().signInWithPopup(authProvider)
      const user = await loginApple({
        ...result,
        name: firebase.auth().currentUser?.displayName,
      })
      this.loginSuccess(user, 'apple')
    } catch (error) {
      this.loginError(error, 'apple')
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
.sign-in-container {
  border-radius: 20px !important;
  padding: 25px !important;
}
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.width-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.signin-button {
  height: 44px;
  cursor: pointer;
  display: block;
  border-radius: 3px;
  size: 14px;
  text-transform: none !important;
  margin-top: 6px;
  margin-bottom: 6px;
}
.signin-facebook {
  background-color: #647daf !important;
  color: #ffffff !important;
}
.signin-google {
  color: rgba(0, 0, 0, 0.54) !important;
}
.signin-apple {
  color: #ffffff !important;
  margin-bottom: 12px !important;
}
.logo-image {
  margin-right: 13px;
}
.signin-telegram {
  display: flex;
  justify-content: center;
}
</style>
