<template lang="pug">
  .v-container.pa-4
    v-flex.text-center
      p.pp(v-html='$t("loginMobile.apple.headline")')
      vue-apple-signin.signin-button.pt-2
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { i18n } from "../plugins/i18n";
import * as api from "../utils/api";

@Component
export default class LoginApple extends Vue {}
</script>
