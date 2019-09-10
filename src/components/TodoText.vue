<template lang="pug">
  div
    span(v-if='!!todo.frog') 🐸
    span(v-for='element in linkifiedText')
      span(v-if='element.type === "text"') {{element.value}}
      a(v-else-if='element.type === "link"' :href='element.url' target='_blank') {{element.value}}
      a(v-else @click.prevent='hash(element.url)') {{element.value}}
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

  hash(hash: string) {
    location.hash = hash;
    serverBus.$emit("refreshRequested");
  }
}
</script>

