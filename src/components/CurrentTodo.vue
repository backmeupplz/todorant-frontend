<template lang="pug">
  v-container
    v-list
      v-list-item
        v-progress-linear(rounded
        :value='progress'
        height='25'
        :color='$vuetify.theme.dark ? undefined : "blue lighten-3"'
        :loading='todoUpdating')
          template(v-slot='{ value }')
            span.caption {{todosCount - incompleteTodosCount}}/{{todosCount}}
        v-spacer
        v-btn(text icon :loading='todoUpdating' @click='updateTodo')
          v-icon refresh
      v-list-item
        v-list-item-content(v-if='!!todo')
          v-card.grey(:class="$vuetify.theme.dark ? 'darken-2' : 'lighten-4'")
            v-card-text {{todo.frog ? '🐸 ' : ''}}{{todo.text}}
            v-card-actions
              span.caption.grey--text.pl-2 {{$t('created')}} {{todo.createdAt.substr(0, 10)}}
              v-spacer
              v-tooltip(:max-width='300' top)
                template(v-slot:activator='{ on }')
                  v-btn(text
                  icon
                  @click='skipTodo'
                  :loading='loading'
                  v-on='on'
                  v-if='incompleteTodosCount > 1')
                    v-icon arrow_right_alt
                span {{$t('skipInfo')}}
              v-tooltip(:max-width='300' top)
                template(v-slot:activator='{ on }')
                  v-btn(text icon @click='addTodo' :loading='loading' v-on='on')
                    v-icon list
                span {{$t('breakdownInfo')}}
              v-btn(text icon @click='completeTodo' :loading='loading')
                v-icon done
        v-list-item-content(v-else).text-center.mt-4
          span.display-3 🎉
          span.headline {{$t('clear.congratulations')}}
          span.body-1 {{$t('clear.text')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Todo } from "../models/todo";
import { getTodos, editTodo } from "../utils/api";
import * as store from "../plugins/store";
import EditTodo from "./EditTodo.vue";
import { Watch } from "vue-property-decorator";
import * as api from "../utils/api";
import { serverBus } from "../main";

@Component
export default class CurrentTodo extends Vue {
  showCompleted = false;
  todo: Todo | null = null;
  incompleteTodosCount = 0;
  todosCount = 0;

  loading = false;

  get progress() {
    return this.todosCount === 0
      ? 0
      : (
          ((this.todosCount - this.incompleteTodosCount) / this.todosCount) *
          100
        ).toFixed(0);
  }

  mounted() {
    this.updateTodo();
  }

  created() {
    serverBus.$on("refreshRequested", () => {
      this.updateTodo();
    });
  }

  todoUpdating = false;
  async updateTodo() {
    if (this.todoUpdating) {
      return;
    }
    const user = store.user();
    if (!user) {
      return;
    }
    this.todoUpdating = true;
    try {
      const fetched = await api.getCurrentTodo(user);
      this.todo = fetched.todo || null;
      this.incompleteTodosCount = fetched.incompleteTodosCount;
      this.todosCount = fetched.todosCount;
    } catch (err) {
      store.setSnackbarError("errors.loadTodos");
    } finally {
      this.todoUpdating = false;
    }
  }

  async completeTodo() {
    const user = store.user();
    if (!user) {
      return;
    }
    if (!this.todo) {
      return;
    }
    this.loading = true;
    try {
      await api.completeTodo(user, this.todo);
      this.updateTodo();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.loading = false;
    }
  }

  addTodo() {
    serverBus.$emit("addTodoRequested");
  }

  async skipTodo() {
    const user = store.user();
    if (!user) {
      return;
    }
    if (!this.todo) {
      return;
    }
    this.loading = true;
    try {
      await api.skipTodo(user, this.todo);
      this.updateTodo();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.loading = false;
    }
  }
}
</script>

