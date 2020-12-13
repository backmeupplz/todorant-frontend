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
import firebase from 'firebase/app'
import 'firebase/auth'
import { v4 as uuid } from 'uuid'

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

  getArgFromHash(name: string) {
    const match = RegExp(`${name}=([^&]+)`).exec(
      decodeURIComponent(this.$route.hash)
    )
    return match && match[1]
  }

  async created() {
    // Telegram auth
    if (this.$route.query && this.$route.query.hash) {
      if (!this.user) {
        this.onTelegramAuth(this.$route.query)
      }
    }
    // Facebook auth
    if (this.$route.path.includes('facebook_login_result')) {
      const accessToken = this.getArgFromHash('access_token')
      if (accessToken) {
        try {
          const user = await loginFacebook(accessToken)
          this.loginSuccess(user, 'facebook')
        } catch (error) {
          this.loginError(error, 'facebook')
        }
      }
    }
    // Google auth
    if (this.$route.path.includes('google_login_result')) {
      const accessToken = this.getArgFromHash('access_token')
      if (accessToken) {
        try {
          const user = await loginGoogle(accessToken)
          this.loginSuccess(user, 'google')
        } catch (error) {
          this.loginError(error, 'google')
        }
      }
    }
    // Apple auth
    if (this.$route.path.includes('apple_login_result')) {
      const idToken = this.getArgFromHash('id_token')
      const userString = this.getArgFromHash('user')
      if (idToken) {
        try {
          const user = await loginApple({
            credential: { oauthIdToken: idToken },
            user: userString ? JSON.parse(userString) : undefined,
          })
          this.loginSuccess(user, 'apple')
        } catch (error) {
          this.loginError(error, 'apple')
        }
      }
    }
  }

  async loginWithGoogle() {
    const clientId =
      '989382323327-rou6lmk2umbnoaq55493v1kqm8fvp22q.apps.googleusercontent.com'
    const redirectUri = 'https://todorant.com/google_login_result'
    const scope =
      'https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email'
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=select_account`
  }

  async loginWithFacebook() {
    window.location.href =
      'https://www.facebook.com/dialog/oauth?client_id=640750769753434&redirect_uri=https://todorant.com/facebook_login_result&scope=email,public_profile&response_type=token&auth_type=rerequest'
  }

  async loginWithApple() {
    window.location.href = `https://appleid.apple.com/auth/authorize?response_type=code%20id_token&response_mode=form_post&client_id=com.todorant.web&redirect_uri=https://backend.todorant.com/login/apple_login_result&scope=email%20name&nonce=${uuid()}&state=${uuid()}`
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
