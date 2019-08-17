<template lang="pug">
  v-container
    v-list(subheader)
      v-list-item
        v-switch(v-model='showCompleted' :label='$t("todo.list.completed")' :loading='todosUpdating')
        v-spacer
        v-btn(text icon :loading='todosUpdating' @click='updateTodos')
          v-icon refresh
      div(v-for='(todoSection, i) in todos' :key='i')
        v-subheader {{todoSection.title}}
        v-list-item(v-for='(todo, j) in todoSection.todos' :key='j')
          v-list-item-content
            v-card.grey(:class="$vuetify.theme.dark ? 'darken-2' : 'lighten-4'")
              v-card-text {{todo.frog ? '🐸 ' : ''}}{{todo.text}}
              v-card-actions
                v-spacer
                v-btn(text icon @click='deleteTodo(todo)' :loading='deleting')
                  v-icon delete
                v-btn(text icon @click='editTodo(todo)')
                  v-icon edit
                v-btn(text icon @click='completeOrUndoTodo(todo)')
                  v-icon {{todo.completed ? 'repeat' : 'done'}}
    EditTodo(:todo='todoEdited' :cleanTodo='cleanTodo')
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

interface TodoSection {
  title: string;
  todos: Todo[];
}

@Component({
  components: {
    EditTodo
  }
})
export default class TodoList extends Vue {
  showCompleted = false;
  todoEdited: Partial<Todo> | null = null;
  todos = [] as TodoSection[];

  deleting = false;

  @Watch("showCompleted")
  onCompletedChanged(val: boolean, oldVal: boolean) {
    if (val === oldVal) return;
    this.updateTodos();
  }

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
      const fetchedTodos = await getTodos(user, this.showCompleted);
      const mappedTodos = fetchedTodos.reduce(
        (prev, cur) => {
          if (cur.date) {
            const date = `${cur.monthAndYear}-${cur.date}`;
            if (prev[date]) {
              prev[date].push(cur);
            } else {
              prev[date] = [cur];
            }
          } else {
            const month = cur.monthAndYear;
            if (prev[month]) {
              prev[month].push(cur);
            } else {
              prev[month] = [cur];
            }
          }
          return prev;
        },
        {} as { [index: string]: Todo[] }
      );
      this.todos = [] as TodoSection[];
      for (const key in mappedTodos) {
        this.todos.push({
          title: key,
          todos: mappedTodos[key]
        });
      }
      this.todos.sort((a, b) => {
        // Months go to the end
        if (a.title.length > b.title.length) {
          return -1;
        } else if (a.title.length < b.title.length) {
          return 1;
        } else {
          return new Date(a.title) > new Date(b.title) ? 1 : -1;
        }
      });
    } catch (err) {
      store.setSnackbarError("errors.loadTodos");
    } finally {
      this.todosUpdating = false;
    }
  }

  editTodo(todo: Todo) {
    const propsTodo = { ...todo } as Partial<Todo>;
    if (!propsTodo || !propsTodo.date) {
      this.todoEdited = propsTodo;
      return;
    }
    propsTodo.date = `${propsTodo.monthAndYear}-${propsTodo.date}`;
    propsTodo.monthAndYear = undefined;
    this.todoEdited = propsTodo;
  }

  async deleteTodo(todo: Todo) {
    const user = store.user();
    if (!user) {
      return;
    }
    this.deleting = true;
    try {
      await api.deleteTodo(user, todo);
      this.updateTodos();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.deleting = false;
    }
  }

  async completeOrUndoTodo(todo: Todo) {
    const user = store.user();
    if (!user) {
      return;
    }
    this.deleting = true;
    try {
      if (todo.completed) {
        await api.undoTodo(user, todo);
      } else {
        await api.completeTodo(user, todo);
      }
      this.updateTodos();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.deleting = false;
    }
  }

  cleanTodo() {
    this.todoEdited = null;
    this.updateTodos();
  }
}
</script>

