<template lang="pug">
  .v-container.pa-4
    // Main content
    v-layout(column justify-center align-center).text-center
      v-flex(xs12 md10)
        .headline.pb-4
          span(v-html='$t("home.info")')
        p(v-html='$t("home.pitch")')
        p(v-for='index in [1, 2, 3, 4, 5, 6, 7, 8, 9]') {{$t(`home.ideas.${index}`)}}
        p {{$t("home.action")}}
        
      v-flex.pt-4
        g-signin-button(:params='{ client_id: googleClientId }'
        @success='onGoogleSignInSuccess'
        @error='onGoogleSignInError') {{$t('home.google')}}
        fb-signin-button(:params='{ scope: "email", return_scopes: true}'
        @success='onFacebookSignInSuccess'
        @error='onFacebookSignInError') {{$t('home.facebook')}}
        //- vue-apple-signin.signin-button.pb-3
        vue-telegram-login(mode='callback'
        telegram-login='todorant_bot'
        @callback='onTelegramAuth'
        radius='3'
        :userpic='false')

      v-flex.pt-4
        .headline.pb-4 {{$t('home.feedback.title')}}
        v-row.text-left
          v-col(v-for='(review, i) in $t("home.feedback.reviews")' :key='i'
          cols='12'
          sm='6')
            v-card
              v-list-item.px-4.pt-3
                v-list-item-avatar
                  img(:src='`/avatars/${review.username}.jpg`')
                v-list-item-content
                  a(href='https://google.com') @{{review.username}}
              v-card-text
                p(v-for='(text, i) in review.text.split("\\n")') {{text}}

      v-flex.pt-4
        div(v-html='$t("support")')
        .caption
          router-link(to='/privacy') {{ $t('home.privacy') }}
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { loginFacebook, loginTelegram, loginGoogle } from "../utils/api";
import * as store from "../plugins/store";
import Component from "vue-class-component";
import { i18n } from "../plugins/i18n";
const { vueTelegramLogin } = require("vue-telegram-login");

// FB object is global, declaring here for TS
declare const FB: any;

@Component({
  components: {
    vueTelegramLogin
  }
})
export default class Home extends Vue {
  created() {
    if (this.$route.query && this.$route.query.hash) {
      if (!store.user()) {
        this.onTelegramAuth(this.$route.query);
      }
    }
  }

  get googleClientId() {
    return "544897902503-4mfcmgifrm4ns7r3l6up0fmangedrpju.apps.googleusercontent.com";
  }

  async onFacebookSignInSuccess(response: any) {
    try {
      const user = await loginFacebook(response.authResponse.accessToken);
      store.setUser(user);
      this.$router.replace("superpower");
    } catch (err) {
      store.setSnackbarError("errors.login.facebook");
    }
  }
  onFacebookSignInError(error: Error) {
    store.setSnackbarError("errors.login.facebook");
  }
  async onGoogleSignInSuccess(googleUser: any) {
    try {
      const user = await loginGoogle(googleUser.getAuthResponse().id_token);
      store.setUser(user);
      this.$router.replace("superpower");
    } catch (err) {
      store.setSnackbarError("errors.login.google");
    }
  }
  onGoogleSignInError(error: Error) {
    store.setSnackbarError("errors.login.google");
  }
  async onTelegramAuth(loginInfo: any) {
    try {
      const user = await loginTelegram(loginInfo);
      store.setUser(user);
      this.$router.replace("superpower");
    } catch (err) {
      store.setSnackbarError("errors.login.telegram");
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
.signin-button {
  width: 210px;
  height: 46px;
  margin: auto;
}
</style>