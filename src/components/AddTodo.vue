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
      v-on="on"
      v-shortkey.once="['a']"
      @shortkey='dialog=true')
        v-icon add
    v-form(ref='form')
      v-card
        v-card-title
          span.headline {{$t('todo.create.title')}}
          v-spacer
          v-tooltip(bottom :max-width='300')
            template(v-slot:activator='{ on }')
              v-icon(v-on='on') info
            span {{$t('todo.create.tooltip')}}
        v-card-text
          v-container
            v-expansion-panels(multiple v-model='panel')
              v-expansion-panel(v-for='(todo, i) in todos' :key='i')
                v-expansion-panel-header
                  span {{todo.text || $t('todo.create.placeholder')}}
                v-expansion-panel-content
                  TodoForm(:todo='todo')
                    v-btn(v-if='todos.length > 1'
                    color='error'
                    text
                    @click='deleteTodo(i)') {{$t('delete')}}
        v-card-actions
          v-btn(color='blue' text @click='addTodo')
            v-icon add
          v-spacer
          v-btn(color='error'
          text 
          @click='dialog = false'
          :disabled='loading') {{$t('cancel')}}
          v-btn(color='blue'
          text 
          @click='save'
          :loading='loading') {{$t('save')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import TodoForm from "./TodoForm.vue";
import { Todo } from "../models/todo";
import * as store from "../plugins/store";
import * as api from "../utils/api";
import { serverBus } from "../main";

@Component({
  components: { TodoForm }
})
export default class AddTodo extends Vue {
  dialog = false;

  panel = [] as Number[];

  todos = [] as Partial<Todo>[];

  loading = false;

  created() {
    serverBus.$on("addTodoRequested", () => {
      this.dialog = true;
    });
  }

  @Watch("dialog")
  onDialogChanged(val: boolean, oldVal: boolean) {
    if (!oldVal && val) {
      this.reset();
    }
  }

  reset() {
    this.todos = [];
    this.addTodo();
    this.panel = [0];
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
  }

  addTodo() {
    this.todos.push({
      date: new Date().toISOString().substr(0, 10)
    });
  }

  deleteTodo(i: number) {
    this.todos.splice(i, 1);
  }

  async save() {
    const user = store.user();
    if (!user) {
      return;
    }
    this.panel = [];
    this.todos.forEach((todo, i) => {
      if (
        !todo ||
        !todo.text ||
        !todo.text.trim() ||
        (!todo.monthAndYear && !todo.date)
      ) {
        this.panel.push(i);
      }
    });
    if (!(this.$refs.form as any).validate()) {
      return;
    }
    if (this.panel.length) {
      store.setSnackbarError("errors.invalidForm");
      return;
    }
    this.loading = true;
    try {
      await api.postTodos(user, this.todos);
      this.dialog = false;
      serverBus.$emit("refreshRequested");
    } catch (err) {
      store.setSnackbarError(err.response.data);
    } finally {
      this.loading = false;
    }
  }
}
</script>
