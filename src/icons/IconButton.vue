<template lang="pug">
v-btn(
  text,
  icon,
  @click='click',
  :loading='loading',
  :color='color || "#3366ff"',
  v-on='on',
  v-shortkey.once='shortkeys',
  @shortkey='shortkey',
  :small='small'
)
  v-icon(:size='small ? 20 : undefined', :style='{ fill: color || "#3366ff" }') {{ name }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Icon extends Vue {
  @Prop({ required: true }) name!: string
  @Prop() color?: string
  @Prop() loading?: boolean
  @Prop() small?: boolean

  @Prop({ required: true }) click!: () => void
  @Prop() on?: () => void
  @Prop() shortkeys?: Object
  @Prop() shortkeyFunction?: () => void

  shortkey() {
    if (this.shortkeyFunction) {
      this.shortkeyFunction()
    }
  }
}
</script>

<style></style>
