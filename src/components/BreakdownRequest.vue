<template lang="pug">
  v-dialog(
    v-model='dialog'
    scrollable
    max-width='600px'
    @click:outside='close'
  )
    v-card
      v-card-title {{$t('warning')}}
      v-card-text(v-html="$t('breakdown.request')")
      v-card-actions
        v-spacer
        v-btn(
          color='default'
          text
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
        ) {{$t('close')}}
        v-btn(
          color='default'
          text
          @click='breakdown'
          v-shortkey.once="['esc']"
          @shortkey='close'
        ) {{$t('breakdown.button')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    dialog: Boolean,
    close: Function,
    breakdown: Function,
  },
})
export default class BreakdownRequest extends Vue {}
</script>
