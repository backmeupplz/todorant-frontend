<template lang="pug">
  div.flex-grow-1(style='max-width: 100%;')
    span(v-if='debug') ({{todo.order}}) 
    span(v-if='debug') ({{todo.frogFails}}) 
    span(v-if='!!todo.frog') 🐸 
    span(v-if='!!todo.time') {{todo.time}} 
    span(v-for='element in linkifiedText' :class='errorDecrypting ? "grey--text" : ""')
      span(v-if='element.type === "text"') {{element.value}}
      a(v-else-if='element.type === "link"'
      :href='element.url'
      target='_blank'
      :style='{color: $store.state.dark ? "#64B5F6" : "#1E88E5"}') {{element.value}}
      a(v-else
      @click.prevent='hash(element.url)'
      :style='{color: colorForTag(element.value.substr(1))}') {{element.value}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { l } from '../utils/linkify'
import { serverBus } from '../main'
import * as store from '../plugins/store'

@Component({
  props: {
    todo: Object,
    text: String,
    errorDecrypting: Boolean,
  },
})
export default class TodoText extends Vue {
  colors = store.tagColors()

  colorForTag(tag: string) {
    return this.colors[tag] || (store.dark() ? '#64B5F6' : '#1E88E5')
  }

  get linkifiedText() {
    if (!this.$props.text) return []
    return l(this.$props.text)
  }

  get debug() {
    return !!process.env.VUE_APP_DEV
  }

  hash(hash: string) {
    location.hash = hash
    serverBus.$emit('refreshRequested')
  }
}
</script>

<style scoped>
span {
  white-space: pre-wrap;
}
</style>
