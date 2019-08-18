<template lang="pug">
  div
    span(v-if='!!todo.frog') 🐸
    span(v-for='element in linkifiedText')
      span(v-if='element.type === "text"') {{element.value}}
      a(v-else :href='element.url' target='_blank') {{element.value}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { l } from "../utils/linkify";

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
}
</script>

