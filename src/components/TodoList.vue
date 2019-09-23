<template lang="pug">
  v-container(style='maxWidth: 1000px;')
    v-list(subheader)
      v-list-item(v-if='$store.state.userState.planning').pt-4
        v-flex
          v-alert(text color='info' icon='info') {{$t('todo.planning')}}
      v-list-item
        v-switch(v-model='showCompleted' :label='$t("todo.list.completed")' :loading='todosUpdating')
        v-spacer
        v-btn(v-if='!editable' icon :loading='todosUpdating' @click='editable = true')
          v-icon format_list_numbered
        v-btn(v-if='!!editable' icon :loading='todosUpdating || loading' @click='editable = false')
          v-icon clear
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
        v-bind="dragOptions"
        handle='.handle')
          v-list-item(v-for='(todo, j) in todoSection.todos' :key='j')
            v-list-item-content
              v-card(:class='cardClass(todo)')
                v-card-text
                  v-row(no-gutters)
                    v-col.handle(:cols='1' v-if='editable')
                      v-icon menu
                    v-col(:cols='editable ? 11 : 12')
                      TodoText(:todo='todo')
                v-card-actions
                  v-icon(v-if='todoOutstanding(todo)') error_outline
                  v-tooltip(:max-width='300' right)
                    template(v-slot:activator='{ on }')
                      span.caption.grey--text.pl-2(v-on='on') {{$t('created')}} {{todo.createdAt.substr(0, 10)}}
                    span {{todo._id}}
                  span.caption.grey--text.pl-2(v-if='todo.skipped') ({{$t('skipped')}})
                  v-spacer
                  v-tooltip(bottom v-if='todoInFuture(todo)')
                    template(v-slot:activator='{ on }')
                      v-btn(text
                      small
                      icon
                      @click='moveTodoToToday(todo)'
                      :loading='loading'
                      v-if='!editable'
                      v-on='on')
                        v-icon(small) vertical_align_top
                    span {{$t('moveUp')}}
                  v-btn(text small icon @click='deleteTodo(todo)' :loading='loading' v-if='!editable')
                    v-icon(small) delete
                  v-btn(text small icon @click='editTodo(todo)' :loading='loading' v-if='!editable')
                    v-icon(small) edit
                  v-btn(text small icon @click='completeOrUndoTodo(todo)' :loading='loading' v-if='!editable')
                    v-icon(small) {{todo.completed ? 'repeat' : 'done'}}
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
import { isTodoOld } from "../utils/isTodoOld";

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

  @Watch("editable")
  onEditableChange(val: boolean, oldVal: boolean) {
    store.setEditting(val);
  }

  mounted() {
    this.updateTodos();
  }

  created() {
    serverBus.$on("refreshRequested", () => {
      this.updateTodos();
    });
  }

  todoInFuture(todo: Todo) {
    return !isTodoOld(todo, api.getTomorrow());
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
      const fetchedTodos = await getTodos(
        user,
        this.showCompleted,
        this.$router.currentRoute.hash
      );
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

  async moveTodoToToday(todo: Todo) {
    const user = store.user();
    if (!user) {
      return;
    }
    this.loading = true;
    try {
      const today = api.getToday();
      const monthAndYear = today.substr(0, 7);
      const date = today.substr(8);
      todo.monthAndYear = monthAndYear;
      todo.date = date;
      await api.editTodo(user, todo);
      this.updateTodos();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.loading = false;
    }
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
    const today = api.getToday();
    return isTodoOld(todo, today);
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

<style>
.handle {
  cursor: move;
}
</style>