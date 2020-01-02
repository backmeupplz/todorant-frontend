<template lang="pug">
  div
    v-btn(fixed
    dark
    fab
    bottom
    right
    color='blue'
    @click='openDialog'
    v-shortkey.once="{ en: ['a'], ru: ['ф'] }"
    @shortkey='openDialog')
      v-icon add
    v-dialog(v-model='dialog'
    persistent
    scrollable
    max-width='600px')
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
                    TodoForm(:todo='todo'
                    :enterPressed='save'
                    :escapePressed='escapePressed'
                    ref='todoForm')
                      v-btn(v-if='todos.length > 1'
                      color='error'
                      text
                      @click='deleteTodo(i)') {{$t('delete')}}
          v-card-actions
            v-btn(color='blue'
            text @click='addTodo'
            v-shortkey.once="{ en: ['shift', 'a'], ru: ['shift', 'ф'] }"
            @shortkey='addTodo')
              v-icon add
            v-spacer
            v-btn(color='error'
            text 
            @click='dialog = false'
            :disabled='loading'
            v-shortkey.once="['esc']"
            @shortkey='dialog=false') {{$t('cancel')}}
            v-btn(color='blue'
            text 
            @click='save'
            :loading='loading'
            v-shortkey.once="['enter']"
            @shortkey='save') {{$t('save')}}
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
import { reportGA } from "../utils/ga";

@Component({
  components: { TodoForm }
})
export default class AddTodo extends Vue {
  dialog = false;

  panel = [] as Number[];

  todos = [] as Partial<Todo & { goFirst: boolean }>[];

  loading = false;

  date = "";

  todoToBreakdown: null | Todo = null;

  created() {
    serverBus.$on(
      "addTodoRequested",
      (date?: string, todoToBreakdown?: Todo) => {
        if (date) {
          this.date = date;
        }
        if (todoToBreakdown) {
          this.todoToBreakdown = todoToBreakdown;
        }
        this.dialog = true;
      }
    );
  }

  mounted() {
    reportGA("add_todo_opened");
  }

  @Watch("dialog")
  onDialogChanged(val: boolean, oldVal: boolean) {
    if (!oldVal && val) {
      this.reset();
    }
  }

  openDialog() {
    if (
      store.userState().subscriptionStatus === store.SubscriptionStatus.inactive
    ) {
      serverBus.$emit("subscriptionRequested");
    } else {
      this.dialog = true;
    }
  }

  reset() {
    this.todos = [];
    this.addTodo();
    this.panel = [0];
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    setTimeout(() => {
      if (this.$refs.todoForm && (this.$refs.todoForm as any).length) {
        (this.$refs.todoForm as any)[0].$refs.textInput.focus();
      }
    }, 500);
  }

  addTodo() {
    if (this.date) {
      this.todos.push({
        date: this.date,
        goFirst: store.userState().settings.newTodosGoFirst || false
      });
      this.date = "";
    } else if (store.userState().settings.showTodayOnAddTodo) {
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      this.todos.push({
        date: now.toISOString().substr(0, 10),
        goFirst: store.userState().settings.newTodosGoFirst || false
      });
    } else {
      this.todos.push({
        goFirst: store.userState().settings.newTodosGoFirst || false
      });
    }
    this.panel = [this.todos.length - 1];

    reportGA("add_todo_add_more");
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
      if (this.todoToBreakdown) {
        const tempTodo = this.todoToBreakdown;
        this.todoToBreakdown = null;
        await api.completeTodo(user, tempTodo);
      }
      this.dialog = false;
      serverBus.$emit("refreshRequested");
      reportGA("add_todo_success");
    } catch (err) {
      store.setSnackbarError(err.response.data);
      reportGA("add_todo_error", { error: err.message });
    } finally {
      this.loading = false;
    }
  }

  escapePressed() {
    this.dialog = false;
  }
}
</script>
