<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex.pa-1(xs12)
        TodoList
    AddTodo

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoList from "../components/TodoList.vue";
import AddTodo from "../components/AddTodo.vue";

@Component({ components: { TodoList, AddTodo } })
export default class Superpower extends Vue {}
</script>
