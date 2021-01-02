<template lang="pug">
v-container(
  style='maxWidth: 1000px;',
  :class='$vuetify.breakpoint.mdAndUp ? "pb-8" : ""'
)
  v-list
    ProgressBlock(
      :updateTodo='updateTodo',
      :completeEpic='completeEpic',
      :loading='todoUpdating',
      :incompleteTodosCount='incompleteTodosCount',
      :todosCount='todosCount'
    )
    v-list-item
      v-list-item-content(v-if='!!todo')
        TodoCard(
          type='current',
          :deleteTodo='deleteTodo',
          :skipTodo='skipTodoFunction',
          :addTodo='addTodo',
          :completeTodo='completeTodoFunction',
          :repeat='completeTodoFunction',
          :edit='edit',
          :todo='todo',
          :loading='loading',
          :incompleteTodosCount='incompleteTodosCount'
        )
      AllDonePlaceholder(
        v-if='!todo && !loading && !todoUpdating && todosCount > 0'
      )
      EmptyPlaceholder(
        v-if='!todo && !loading && !todoUpdating && todosCount === 0'
      )
  EditTodo(
    :todo='todoEdited',
    :cleanTodo='cleanTodo',
    :requestDelete='requestDelete'
  )
  DeleteTodo(:todo='todoDeleted')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Todo } from '@/models/Todo'
import TodoText from '@/components/TodoCard/TodoText.vue'
import DeleteTodo from '@/components/DeleteTodo.vue'
import EditTodo from '@/views/EditTodo.vue'
import { Watch } from 'vue-property-decorator'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { playSound, Sounds } from '@/utils/sounds'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { Tag } from '@/models/Tag'
import ProgressBlock from '@/views/current/ProgressBlock.vue'
import EmptyPlaceholder from '@/views/current/EmptyPlaceholder.vue'
import AllDonePlaceholder from '@/views/current/AllDonePlaceholder.vue'
import TodoCard from '@/components/TodoCard/TodoCard.vue'
import store from '@/store'
import { db } from '@/utils/db'
import {
  getDateDateString,
  getDateMonthAndYearString,
  getTodayWithStartOfDay,
} from '@/utils/time'
import { isTodoOld } from '@/utils/isTodoOld'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')
const SettingsStore = namespace('SettingsStore')
const TagsStore = namespace('TagsStore')
const TodosStore = namespace('TodosStore')

@Component({
  components: {
    TodoText,
    DeleteTodo,
    EditTodo,
    ProgressBlock,
    EmptyPlaceholder,
    AllDonePlaceholder,
    TodoCard,
  },
})
export default class CurrentTodo extends Vue {
  @UserStore.State user?: User
  @UserStore.Mutation setPlanning!: (planning: boolean) => void
  @SettingsStore.State hotKeysEnabled!: boolean
  @SettingsStore.State startTimeOfDay?: string
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @TagsStore.State searchTags!: Set<String>
  @TagsStore.Action editTag!: ({
    tag,
    color,
    epic,
    epicGoal,
    epicCompleted,
    newEpicName,
  }: {
    tag: Tag
    color?: string
    epic?: boolean
    epicGoal?: number
    epicCompleted?: boolean
    newEpicName?: string
  }) => Promise<void>
  @TodosStore.Action completeTodo!: (todo: Todo) => Promise<void>
  @TodosStore.Action skipTodo!: (todo: Todo) => Promise<void>

  showCompleted = false
  todo: Todo | null = null
  incompleteTodosCount = 0
  todosCount = 0

  loading = false

  todoEdited: Partial<Todo> | null = null
  todoDeleted: Todo | null = null

  get progress() {
    return this.todosCount === 0
      ? 0
      : (
          ((this.todosCount - this.incompleteTodosCount) / this.todosCount) *
          100
        ).toFixed(0)
  }

  mounted() {
    this.updateTodo()
  }

  created() {
    window.onhashchange = () => {
      const hashArr = decodeURI(this.$router.currentRoute.hash).split(',')
      this.searchTags.add(hashArr[hashArr.length - 1])
    }

    serverBus.$on('refreshRequested', () => {
      this.updateTodo()
    })
  }

  todoUpdating = false

  async completeEpic(epic: Tag) {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await this.editTag({
        tag: epic,
        color: undefined,
        epic: undefined,
        epicGoal: undefined,
        epicCompleted: true,
      })
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async updateTodo() {
    if (this.todoUpdating) {
      return
    }
    const user = this.user
    if (!user) {
      return
    }
    this.todoUpdating = true
    try {
      const todayDate = getTodayWithStartOfDay()
      const monthAndYear = getDateMonthAndYearString(todayDate)
      const date = getDateDateString(todayDate)
      const allTodos = await db.todos.filter((todo) => true).sortBy('order')
      const completedTodos: Todo[] = []
      const incompleteTodos: Todo[] = []
      let shouldPlanning = false
      allTodos.forEach((todo) => {
        if (todo.deleted || todo.delegate || todo.delegator || todo.deleted)
          return
        if (todo.date === date && todo.monthAndYear === monthAndYear) {
          if (todo.completed) {
            completedTodos.push(todo)
          } else {
            incompleteTodos.push(todo)
            if (isTodoOld(todo, api.getStringFromDate(todayDate))) {
              shouldPlanning = true
            }
          }
        }
      })
      this.setPlanning(shouldPlanning)
      this.todo = incompleteTodos[0] || null
      this.incompleteTodosCount = incompleteTodos.length
      this.todosCount = completedTodos.length + incompleteTodos.length
    } catch (err) {
      // Don's show request abort
      if (err.message.includes('aborted')) {
        return
      }
      this.setSnackbarError('errors.loadTodos')
    } finally {
      this.todoUpdating = false
    }
  }

  async completeTodoFunction(hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) {
      return
    }
    const user = this.user
    if (!user) {
      return
    }
    if (!this.todo) {
      return
    }
    this.loading = true
    try {
      await this.completeTodo(this.todo)
      if (this.todo.frog) {
        await playSound(Sounds.levelUp)
      } else {
        await playSound(Sounds.taskDone)
      }
      this.updateTodo()
      this.tryConfetti()
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async deleteTodo() {
    this.todoDeleted = this.todo ? { ...this.todo } : null
  }

  addTodo(hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) {
      return
    }
    serverBus.$emit('addTodoRequested', undefined, this.todo)
  }

  edit() {
    const propsTodo = { ...this.todo } as Partial<Todo>
    if (!propsTodo || !propsTodo.date) {
      this.todoEdited = propsTodo
      return
    }
    propsTodo.date = `${propsTodo.monthAndYear}-${propsTodo.date}`
    propsTodo.monthAndYear = undefined
    this.todoEdited = propsTodo
  }

  async skipTodoFunction() {
    const user = this.user
    if (!user) {
      return
    }
    if (!this.todo) {
      return
    }
    this.loading = true
    try {
      this.skipTodo(this.todo)
      this.updateTodo()
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  animating = false
  tryConfetti() {
    const random = Math.floor(Math.random() * 5)
    if (this.animating || random !== 0) {
      return
    }
    this.animating = true
    ;(this as any).$confetti.start({
      particlesPerFrame: 0.85,
      defaultType: 'heart',
    })
    setTimeout(() => {
      ;(this as any).$confetti.stop()
    }, 3000)
    setTimeout(() => {
      this.animating = false
    }, 15000)
  }

  cleanTodo(needsReload = true) {
    this.todoEdited = null
    if (needsReload) {
      this.updateTodo()
    }
  }

  requestDelete() {
    this.deleteTodo()
  }
}
</script>
