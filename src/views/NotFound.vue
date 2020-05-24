<template lang="pug">
  v-container.pa-4
    v-layout.text-center
      v-flex(xs12)
        .headline
          span {{$t('notFound')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { logEvent } from '../utils/logEvent'

@Component
export default class NotFound extends Vue {
  mounted() {
    logEvent('not_found')
  }
}
</script>
