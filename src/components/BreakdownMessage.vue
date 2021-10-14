<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='complete'
)
  v-card
    v-card-title {{ $t("breakdownMessage.title") }}
    v-card-text(v-html='$t("breakdownMessage.text")')
    v-card-actions
      v-btn(
        color='default',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey.native='close'
      ) {{ $t("close") }}
      v-spacer
      v-btn(
        color='default',
        text,
        @click='complete',
        @shortkey.native='complete'
      ) {{ $t("breakdownMessage.complete") }}
      v-btn(
        color='default',
        text,
        @click='breakdown',
        v-shortkey.once='["enter"]',
        @shortkey.native='breakdown'
      ) {{ $t("breakdown.button") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class BreakdownMessage extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) complete!: () => void
  @Prop({ required: true }) breakdown!: () => void
  @Prop({ required: true }) close!: () => void
}
</script>
