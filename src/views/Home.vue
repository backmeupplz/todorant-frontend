<template lang="pug">
  .v-container.pa-4
    v-dialog(v-model='signinDialog'
    max-width="289")
      v-card
        v-card-text.pt-4
          v-flex.text-center
            fb-signin-button(:params='{ scope: "email", return_scopes: true}'
            @success='onFacebookSignInSuccess'
            @error='onFacebookSignInError') {{$t('home.facebook')}}
            GoogleLogin(:params='googleParams'
            :onSuccess="onGoogleAuthSuccess"
            :onFailure="onGoogleAuthFail") {{$t('home.google')}}
            vue-apple-signin.signin-button.pb-3
            vue-telegram-login(mode='callback'
            telegram-login='todorant_bot'
            @callback='onTelegramAuth'
            radius='3'
            :userpic='false')
    v-layout
      v-col
        v-row
          v-col(cols=12 sm=6 :class='["xs", "sm"].includes(this.$vuetify.breakpoint.name) ? "text-center": ""')
            p.my-1.display-1 {{$t('home.headline[0]')}}
            p.my-1.display-1 {{$t('home.headline[1]')}}
            p.mt-1.display-1 {{$t('home.headline[2]')}}
            p.title {{$t('home.headline[3]')}}
            v-flex.text-center
              v-btn.primary(block @click='signinDialog = true') {{$t('home.signIn')}}
              p.caption.pa-2 {{$t('home.youAreRegistered')}}
            .d-flex.direction-row.justify-center
              a.pt-3(@click='open($store.state.language === "ru" ? "https://apps.apple.com/ru/app/todorant/id1482078243" : "https://apps.apple.com/us/app/todorant/id1482078243")')
                v-img(width='150' height='50' aspect-ratio='1' :src='`/img/appstore_${$store.state.language === "ru" ? "ru" : "en"}.svg`')
              a.pl-1(@click='open("https://play.google.com/store/apps/details?id=com.todorant")')
                v-img(width='170' height='74' aspect-ratio='1' :src='`/img/playstore_${$store.state.language === "ru" ? "ru" : "en"}.png`')
          v-col(cols=12 sm=6)
            v-img(:src='this.pictures.iphone').d-flex.elevation-1
        v-row
          v-col
            p.display-1 {{$t('home.texts.level[0]')}}
            p {{$t('home.texts.level[1]')}}
            p {{$t('home.texts.level[2]')}}
        v-row
          v-col
            v-img(:src='pictures.desktop').d-flex.elevation-1
        v-row
          v-col
            p.display-1 {{$t('home.texts.winter[0]')}}
            p {{$t('home.texts.winter[1]')}}
            p {{$t('home.texts.winter[2]')}}
            p.display-1 {{$t('home.texts.solution[0]')}}
            p {{$t('home.texts.solution[1]')}}
            p {{$t('home.texts.solution[2]')}}
        v-row
          v-col(cols=12 sm=6)
            v-img(src='img/android.jpg').d-flex.elevation-1
          v-col(cols=12 sm=6)
            p.display-1 {{$t('home.texts.consequences.title')}}
            ul
              li(v-for='text in $t("home.texts.consequences.points")') {{text}}
        v-row
          v-col
            p.display-1 {{$t("home.texts.deal[0]")}}
            p {{$t("home.texts.deal[1]")}}
            p
              | {{$t("home.texts.deal[2]")}}
              a(@click='openRules') {{$t("home.texts.deal[3]")}}
              | {{$t("home.texts.deal[4]")}}
            p.display-1 {{$t("home.texts.personal[0]")}}
            p {{$t("home.texts.personal[1]")}}
        v-row
          v-col(cols=0 sm=4)
          v-col(cols=12 sm=4)
            v-flex.text-center
              v-btn.primary(block  @click='signinDialog = true') {{$t('home.signIn')}}
              p.caption.pa-2 {{$t('home.youAreRegistered')}}
          v-col(cols=0 sm=4)
        v-row
          v-col
            p.display-1 {{$t('home.feedback.title')}}
        v-flex(row justify-center)
          v-col(v-for='(review, i) in $t("home.feedback.reviews")'
          :key='i'
          cols='12'
          sm='6')
            v-card
              v-list-item.px-4.pt-3
                v-list-item-avatar
                  img(:src='`/avatars/${review.username}.jpg`')
                v-list-item-content
                  a(:href='`https://t.me/${review.username}`') @{{review.username}}
              v-card-text
                p(v-for='(text, i) in review.text.split("\\n")') {{text}}
        v-row.pt-4
          v-col(cols=0 sm=4)
          v-col(cols=12 sm=4)
            v-flex.text-center
              v-btn.primary(block @click='signinDialog = true') {{$t('home.signIn')}}
              p.caption.pa-2 {{$t('home.lastSignIn')}}
          v-col(cols=0 sm=4)
        v-row.justify-center
          a.pt-3(@click='open($store.state.language === "ru" ? "https://apps.apple.com/ru/app/todorant/id1482078243" : "https://apps.apple.com/us/app/todorant/id1482078243")')
            v-img(width='150' height='50' aspect-ratio='1' :src='`/img/appstore_${$store.state.language === "ru" ? "ru" : "en"}.svg`')
          a.pl-1(@click='open("https://play.google.com/store/apps/details?id=com.todorant")')
            v-img(width='170' height='74' aspect-ratio='1' :src='`/img/playstore_${$store.state.language === "ru" ? "ru" : "en"}.png`')
        v-row(no-gutters)
          v-col.text-center
            p.caption.ma-0
              | {{$t('home.texts.contact[0]')}}
              a(href='mailto:n@borodutch.com') n@borodutch.com
              | {{$t('home.texts.contact[1]')}}
            router-link.caption.ma-0(to='/privacy') {{$t('home.privacy')}}
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import {
  loginFacebook,
  loginTelegram,
  loginGoogle,
  loginApple,
} from '../utils/api'
import * as store from '../plugins/store'
import Component from 'vue-class-component'
import { i18n } from '../plugins/i18n'
const { vueTelegramLogin } = require('vue-telegram-login')
import { reportGA } from '../utils/ga'
import { serverBus } from '../main'
import GoogleLogin from 'vue-google-login'

// FB object is global, declaring here for TS
declare const FB: any

@Component({
  components: {
    vueTelegramLogin,
    GoogleLogin,
  },
})
export default class Home extends Vue {
  signinDialog = false

  created() {
    if (this.$route.query && this.$route.query.hash) {
      if (!store.user()) {
        this.onTelegramAuth(this.$route.query)
      }
    } else if (this.$route.query && this.$route.query.apple) {
      if (!store.user()) {
        this.onAppleAuth(JSON.parse(this.$route.query.apple as string))
      }
    }
  }

  mounted() {
    reportGA('home_mounted')
  }

  get pictures() {
    return {
      desktop: `img/desktop-${this.imageModifier}.png`,
      iphone: `img/iphone-${this.imageModifier}.png`,
    }
  }

  get googleParams() {
    return {
      client_id:
        '599005831909-krrl1m3k011n7qdrkv1voio9cgdv7a0t.apps.googleusercontent.com',
    }
  }

  get imageModifier() {
    return `${i18n.locale}-${this.mode}`
  }

  get mode() {
    return store.dark() ? 'dark' : 'light'
  }

  async onFacebookSignInSuccess(response: any) {
    try {
      const user = await loginFacebook(response.authResponse.accessToken)
      store.setUser(user)
      this.signinDialog = false
      this.$router.replace('superpower')
      reportGA('login_success', { provider: 'facebook' })
    } catch (err) {
      console.error(err)
      store.setSnackbarError('errors.login.facebook')
      reportGA('login_error', { provider: 'facebook', error: err.message })
    }
  }
  onFacebookSignInError(error: Error) {
    console.error(error)
    store.setSnackbarError('errors.login.facebook')
    reportGA('login_error', { provider: 'facebook', error: error.message })
  }

  async onGoogleAuthSuccess(googleUser: any) {
    try {
      const user = await loginGoogle(googleUser.getAuthResponse().id_token)
      store.setUser(user)
      this.signinDialog = false
      this.$router.replace('superpower')
      reportGA('login_success', { provider: 'google' })
    } catch (err) {
      console.error(err)
      store.setSnackbarError('errors.login.google')
      reportGA('login_error', { provider: 'google', error: err.message })
    }
  }
  onGoogleAuthFail(error: Error) {
    console.error(error)
    store.setSnackbarError('errors.login.google')
    reportGA('login_error', { provider: 'google', error: error.message })
  }
  async onTelegramAuth(loginInfo: any) {
    try {
      const user = await loginTelegram(loginInfo)
      store.setUser(user)
      this.signinDialog = false
      this.$router.replace('superpower')
      reportGA('login_success', { provider: 'telegram' })
    } catch (err) {
      console.error(err)
      store.setSnackbarError('errors.login.telegram')
      reportGA('login_error', { provider: 'telegram', error: err.message })
    }
  }
  async onAppleAuth(loginInfo: any) {
    try {
      const user = await loginApple(loginInfo)
      store.setUser(user)
      this.signinDialog = false
      this.$router.replace('superpower')
      reportGA('login_success', { provider: 'apple' })
    } catch (err) {
      console.error(err)
      store.setSnackbarError('errors.login.apple')
      reportGA('login_success', { provider: 'apple' })
    }
  }
  open(link: string) {
    reportGA('open_link', { link })
    window.open(link, '_blank')
  }
  openRules() {
    serverBus.$emit('rulesRequested')
  }
}
</script>

<style>
@font-face {
  font-family: 'Roboto-Medium';
  src: url(/fonts/Roboto-Medium.ttf) format('truetype');
}
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
