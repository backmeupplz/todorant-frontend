<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.pa-1(xs12)
        TodoList
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoList from "../components/TodoList.vue";

@Component({ components: { TodoList } })
export default class Superpower extends Vue {}
</script>
