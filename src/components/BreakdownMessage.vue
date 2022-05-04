<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close',
  persistent
)
  v-card
    v-card-title {{ $t("breakdownMessage.title") }}
    v-card-text(v-html='$t("breakdownMessage.text")')
    v-card-actions
      v-btn(color='default', text, @click='close', v-hotkey='keymap') {{ $t("close") }}
      v-spacer
      v-btn(color='default', text, @click='() => complete()') {{ $t("breakdownMessage.complete") }}
      v-btn(color='default', text, @click='() => breakdown()') {{ $t("breakdown.button") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class BreakdownMessage extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) complete!: (hotkey: boolean) => void
  @Prop({ required: true }) breakdown!: (hotkey: boolean) => void
  @Prop({ required: true }) close!: () => void

  get keymap() {
    return !this.dialog
      ? {}
      : {
          esc: this.close,
          'shift+enter': {
            keyup: () => this.breakdown(true),
          },
          enter: () => this.complete(true),
        }
  }
}
</script>
