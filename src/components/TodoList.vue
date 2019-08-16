<template lang="pug">
  p {{JSON.stringify(todos, undefined, 2)}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Todo } from "../models/todo";
import { getTodos } from "../utils/api";
import * as store from "../plugins/store";

@Component
export default class TodoList extends Vue {
  todos = [] as Todo[];

  mounted() {
    this.updateTodos();
  }

  todosUpdating = false;
  async updateTodos() {
    if (this.todosUpdating) {
      return;
    }
    const user = store.user();
    if (!user) {
      return;
    }
    this.todosUpdating = true;
    try {
      this.todos = await getTodos(user);
    } catch (err) {
      store.setSnackbarError("errors.loadTodos");
    } finally {
      this.todosUpdating = false;
    }
  }
}
</script>

