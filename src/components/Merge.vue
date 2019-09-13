<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  persistent)
    v-card
      v-card-title {{$t('merge.title')}}
      v-card-text
        span {{$t('merge.description')}}
        span(v-if='done') {{$t('merge.done')}}
      v-layout(column justify-center align-center).text-center
        vue-telegram-login(mode='callback'
        telegram-login='todorant_bot'
        @callback='onTelegramAuth'
        radius='3'
        :userpic='false'
        v-if='!user.telegramId')
        g-signin-button(:params='{ client_id: googleClientId }'
        @success='onGoogleSignInSuccess'
        @error='onGoogleSignInError'
        v-if='!user.email') {{$t("home.google")}}
        fb-signin-button(:params='{ scope: "email", return_scopes: true}'
        @success='onFacebookSignInSuccess'
        @error='onFacebookSignInError'
        v-if='!user.facebookId') {{$t('home.facebook')}}
      v-card-actions
        v-spacer
        v-btn(color='blue'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
          :loading='loading') {{$t('close')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";
import { i18n } from "../plugins/i18n";
const { vueTelegramLogin } = require("vue-telegram-login");
import { mergeFacebook, mergeTelegram, mergeGoogle } from "../utils/api";

@Component({
  props: {
    dialog: Boolean,
    close: Function
  },
  components: {
    vueTelegramLogin
  }
})
export default class Merge extends Vue {
  loading = false;

  get done() {
    const user = store.user();
    if (!user) {
      return false;
    }
    return !!user.email && user.facebookId && user.telegramId;
  }
  get user() {
    const user = store.user();
    if (!user) {
      return undefined;
    }
    return user;
  }
  get googleClientId() {
    return "544897902503-4mfcmgifrm4ns7r3l6up0fmangedrpju.apps.googleusercontent.com";
  }

  async onFacebookSignInSuccess(response: any) {
    this.loading = true;
    try {
      if (!this.user) {
        return;
      }
      if (
        !confirm(i18n.t("merge.confirm", {
          id: response.authResponse.userID
        }) as string)
      ) {
        return;
      }
      await mergeFacebook(this.user, response.authResponse.accessToken);
    } catch (err) {
      store.setSnackbarError("errors.login.facebook");
    } finally {
      this.loading = false;
    }
  }
  onFacebookSignInError(error: Error) {
    store.setSnackbarError("errors.login.facebook");
  }
  async onGoogleSignInSuccess(googleUser: any) {
    this.loading = true;
    try {
      if (!this.user) {
        return;
      }
      const email = googleUser.getBasicProfile().getEmail();
      if (
        !confirm(i18n.t("merge.confirm", {
          id: email
        }) as string)
      ) {
        return;
      }
      await mergeGoogle(this.user, googleUser.getAuthResponse().id_token);
    } catch (err) {
      store.setSnackbarError("errors.login.google");
    } finally {
      this.loading = false;
    }
  }
  onGoogleSignInError(error: Error) {
    store.setSnackbarError("errors.login.google");
  }
  async onTelegramAuth(loginInfo: any) {
    this.loading = true;
    try {
      if (!this.user) {
        return;
      }
      if (
        !confirm(i18n.t("merge.confirm", {
          id: loginInfo.id
        }) as string)
      ) {
        return;
      }
      await mergeTelegram(this.user, loginInfo);
    } catch (err) {
      store.setSnackbarError("errors.login.telegram");
    } finally {
      this.loading = false;
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
