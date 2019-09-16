<template lang="pug">
  .v-container.pa-4.text-center
    h2.pa-4 {{$t(success ? 'subscription.payment.success' : 'subscription.payment.failure')}}
    v-btn.ma-4(replace
    to='/superpower'
    color='primary') {{$t('subscription.payment.back')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { i18n } from "../plugins/i18n";

@Component
export default class Home extends Vue {
  get success() {
    return this.$router.currentRoute.path.includes("success");
  }
}
</script>