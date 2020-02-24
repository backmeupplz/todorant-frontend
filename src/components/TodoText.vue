<template lang="pug">
  div
    span(v-if='debug') ({{todo.order}}) 
    span(v-if='!!todo.frog') 🐸 
    span(v-if='!!todo.time') {{todo.time}} 
    span(v-for='element in linkifiedText')
      span(v-if='element.type === "text"') {{element.value}}
      a(v-else-if='element.type === "link"'
      :href='element.url'
      target='_blank'
      :style='{color: $store.state.dark ? "#64B5F6" : "#1E88E5"}') {{element.value}}
      a(v-else
      @click.prevent='hash(element.url)'
      :style='{color: $store.state.dark ? "#64B5F6" : "#1E88E5"}') {{element.value}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { l } from "../utils/linkify";
import { serverBus } from "../main";

@Component({
  props: {
    todo: Object
  }
})
export default class TodoText extends Vue {
  get linkifiedText() {
    const todo = (this as any).todo;
    if (!todo || !todo.text) return [];
    return l(todo.text);
  }

  get debug() {
    return !!process.env.VUE_APP_DEV;
  }

  hash(hash: string) {
    location.hash = hash;
    serverBus.$emit("refreshRequested");
  }
}
</script>
