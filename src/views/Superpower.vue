<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.pa-1(xs12)
        p It's alive!
    .text-xs-center.pt-4
      div(v-html='$t("support")')
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Superpower extends Vue {}
</script>
