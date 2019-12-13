<template lang="pug">
  v-container.pa-4
    v-layout.text-center
      v-flex(xs12)
        .headline
          span {{$t('notFound')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { reportGA } from "../utils/ga";

@Component
export default class NotFound extends Vue {
  mounted() {
    reportGA("not_found");
  }
}
</script>
