<template lang="pug">
  v-dialog(v-model='dialog'
  persistent
  scrollable
  max-width='600px')
    template(v-slot:activator='{ on }')
      v-btn(fixed
      dark
      fab
      bottom
      right
      color='blue'
      v-on="on")
        v-icon add
    v-card
      v-card-title
        span.headline {{$t('todo.create.title')}}
      v-card-text
        v-container
          v-expansion-panels(multiple v-model='panel')
            TodoForm(v-for='(todo, i) in todos' :todo='todo'  :key='i')
      v-card-actions
        v-btn(color='blue' text @click='addTodo')
          v-icon add
        v-spacer
        v-btn(color='error' text @click='dialog = false') {{$t('cancel')}}
        v-btn(color='blue' text @click='dialog = false') {{$t('save')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import TodoForm from "./TodoForm.vue";
import { Todo } from "../models/todo";

@Component({
  components: { TodoForm }
})
export default class AddTodo extends Vue {
  dialog = false;

  panel = [] as Number[];

  todos = [] as Partial<Todo>[];

  @Watch("dialog")
  onChildChanged(val: boolean, oldVal: boolean) {
    if (!oldVal && val) {
      this.reset();
    }
  }

  reset() {
    this.todos = [];
    this.addTodo();
    this.panel = [0];
  }

  addTodo() {
    this.todos.push({});
  }
}
</script>
