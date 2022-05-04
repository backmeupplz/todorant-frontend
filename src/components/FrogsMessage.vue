<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close',
  persistent
)
  v-card
    v-card-title {{ $t("frogsAlert.title") }}
    v-card-text(v-html='$t("frogsAlert.text")')
    v-card-actions
      v-spacer
      v-btn(color='default', text, @click='close', v-hotkey='keymap') {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class FrogsMessage extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  get keymap() {
    return {
      esc: this.close,
    }
  }
}
</script>
