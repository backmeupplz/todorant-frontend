<template lang="pug">
  .v-container.pa-4.text-center
    p {{$t('loginMobile.telegram.headline')}}
    vue-telegram-login(mode='callback'
    telegram-login='todorant_bot'
    @callback='onTelegramAuth'
    radius='3'
    :userpic='false')
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { loginTelegram } from "../utils/api";
const { vueTelegramLogin } = require("vue-telegram-login");

@Component({
  components: {
    vueTelegramLogin
  }
})
export default class LoginTelegram extends Vue {
  async onTelegramAuth(loginInfo: any) {
    try {
      const user = await loginTelegram(loginInfo);
      window.location.href = `https://todorant.com/mobile_login_success?data=${JSON.stringify(
        loginInfo
      )}`;
    } catch (err) {
      window.location.href = `https://todorant.com/mobile_login_error?data=${err.message}`;
      console.error(err);
    }
  }
}
</script>