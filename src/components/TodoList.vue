<template lang="pug">
  v-container
    v-list(subheader)
      v-list-item(v-if='$store.state.planning').pt-4
        v-flex
          v-alert(text color='info' icon='info') {{$t('todo.planning')}}
      v-list-item
        v-switch(v-model='showCompleted' :label='$t("todo.list.completed")' :loading='todosUpdating')
        v-spacer
        v-btn(v-if='!editable' icon :loading='todosUpdating' @click='editable = true')
          v-icon edit
        v-btn(v-if='!!editable' icon :loading='todosUpdating || loading' @click='doneEditing' color='green')
          v-icon done
        v-btn(icon :loading='todosUpdating' @click='updateTodos')
          v-icon refresh
      div(v-for='(todoSection, i) in todos' :key='i')
        v-subheader {{todoSection.title}}
        draggable(v-model='todoSection.todos'
        group='todo'
        @start='drag=true'
        @end='drag=false'
        v-bind="dragOptions")
          v-list-item(v-for='(todo, j) in todoSection.todos' :key='j')
            v-list-item-content
              v-card(:class='cardClass(todo)')
                v-card-text
                  TodoText(:todo='todo')
                v-card-actions
                  v-icon(v-if='todoOutstanding(todo)') error_outline
                  span.caption.grey--text.pl-2 {{$t('created')}} {{todo.createdAt.substr(0, 10)}}
                  v-spacer
                  v-btn(text icon @click='deleteTodo(todo)' :loading='loading')
                    v-icon delete
                  v-btn(text icon @click='editTodo(todo)' :loading='loading')
                    v-icon edit
                  v-btn(text icon @click='completeOrUndoTodo(todo)' :loading='loading')
                    v-icon {{todo.completed ? 'repeat' : 'done'}}
    EditTodo(:todo='todoEdited' :cleanTodo='cleanTodo')
    DeleteTodo(:todo='todoDeleted')
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Todo } from "../models/todo";
import { getTodos, editTodo } from "../utils/api";
import * as store from "../plugins/store";
import EditTodo from "./EditTodo.vue";
import DeleteTodo from "./DeleteTodo.vue";
import TodoText from "./TodoText.vue";
import { Watch } from "vue-property-decorator";
import * as api from "../utils/api";
import { serverBus } from "../main";
import draggable from "vuedraggable";
import { TodoSection } from "../models/TodoSection";

@Component({
  components: {
    TodoText,
    EditTodo,
    DeleteTodo,
    draggable
  }
})
export default class TodoList extends Vue {
  showCompleted = false;
  todoEdited: Partial<Todo> | null = null;
  todoDeleted: Todo | null = null;
  todos = [] as TodoSection[];

  loading = false;
  drag = false;
  editable = false;

  @Watch("showCompleted")
  onCompletedChanged(val: boolean, oldVal: boolean) {
    if (val === oldVal) return;
    this.updateTodos();
  }

  mounted() {
    this.updateTodos();
  }

  created() {
    serverBus.$on("refreshRequested", () => {
      this.updateTodos();
    });
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
      if (this.showCompleted) {
        this.todos.reverse();
      }
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
    this.todoDeleted = { ...todo } as Todo;
  }

  async completeOrUndoTodo(todo: Todo) {
    const user = store.user();
    if (!user) {
      return;
    }
    this.loading = true;
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
      this.loading = false;
    }
  }

  cleanTodo() {
    this.todoEdited = null;
    this.updateTodos();
  }

  cardClass(todo: Todo) {
    const dark = store.dark();
    const outstanding = this.todoOutstanding(todo);
    return dark
      ? outstanding
        ? "blue darken-3"
        : "grey darken-2"
      : outstanding
      ? "blue lighten-4"
      : "grey lighten-4";
  }

  todoOutstanding(todo: Todo) {
    if (todo.completed) {
      return false;
    }
    const now = new Date();
    const month =
      now.getMonth() + 1 < 10
        ? `0${now.getMonth() + 1}`
        : `${now.getMonth() + 1}`;
    const monthAndYear = `${now.getFullYear()}-${month}`;
    const date = now.getDate();
    if (!todo.date && todo.monthAndYear === monthAndYear) {
      return true;
    }
    if (todo.monthAndYear === monthAndYear && +todo.date < date) {
      return true;
    }
    return false;
  }

  get dragOptions() {
    return {
      animation: 0,
      disabled: !this.editable
    };
  }

  async doneEditing() {
    const user = store.user();
    if (!user) {
      return;
    }
    this.loading = true;
    try {
      await api.rearrangeTodos(user, this.todos);
      await this.updateTodos();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.loading = false;
      this.editable = false;
    }
  }
}
</script>

