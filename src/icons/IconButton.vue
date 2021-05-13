<template lang="pug">
v-btn(
  text,
  icon,
  @click='click',
  :loading='loading',
  :color='color || "#3366ff"',
  v-on='on',
  v-shortkey.once.propagte='shortkeys',
  @shortkey.native.propagte='shortkey',
  :small='small',
  :aria-label='name.substr(1)'
)
  v-icon(:size='small ? 20 : undefined', :style='{ fill: color || "#3366ff" }') {{ name }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const AppStore = namespace('AppStore')

@Component
export default class Icon extends Vue {
  @AppStore.State todoDialog!: boolean

  @Prop({ required: true }) name!: string
  @Prop() color?: string
  @Prop() loading?: boolean
  @Prop() small?: boolean

  @Prop({ required: true }) click!: () => void
  @Prop() on?: () => void
  @Prop() shortkeys?: Object
  @Prop() shortkeyFunction?: () => void

  shortkey() {
    if (this.shortkeyFunction && !this.todoDialog) {
      this.shortkeyFunction()
    }
  }
}
</script>

<style></style>
