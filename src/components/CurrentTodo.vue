<template lang="pug">
  v-container(
    style='maxWidth: 1000px;'
    :class='$vuetify.breakpoint.mdAndUp ? "pb-8" : ""'
  )
    v-list
      v-list-item
        v-progress-linear(
          rounded
          :value='progress'
          height='25'
          :color='$vuetify.theme.dark ? undefined : "blue lighten-3"'
          :loading='todoUpdating'
        )
          template(v-slot='{ value }')
            span.caption {{todosCount - incompleteTodosCount}}/{{todosCount}}
        v-spacer.px-2
        v-btn(
          text
          icon
          :loading='todoUpdating'
          @click='updateTodo'
        )
          v-icon refresh
      v-list-item
        v-list-item-content(v-if='!!todo')
          v-card.grey(
            :class="$vuetify.theme.dark ? 'darken-2' : 'lighten-4'"
          )
            v-card-text
              TodoText(
                :todo='todo'
                :text='text'
                :errorDecrypting='errorDecrypting'
              )
            v-card-actions
              v-icon.grey--text.pl-2(
                small
                v-if='todo.encrypted'
              ) vpn_key
              v-icon.grey--text.pl-2(
                small
                v-if='todo.skipped'
              ) arrow_forward
              v-spacer
              v-btn(
                text
                icon
                :loading='loading'
                @click='deleteTodo'
              )
                v-icon delete
              v-btn.ma-0(
                text
                icon
                @click='skipTodo'
                :loading='loading'
                v-if='incompleteTodosCount > 1 && !todo.frog && !todo.time'
              )
                v-icon arrow_right_alt
              v-tooltip.ml-4(
                :max-width='300'
                bottom
              )
                template(v-slot:activator='{ on }')
                  v-btn(
                    text
                    icon
                    @click='addTodo()'
                    :loading='loading'
                    v-on='on'
                    v-shortkey.once="{ en: ['b'], ru: ['и'] }"
                    @shortkey='addTodo(true)'
                  )
                    v-icon list
                span {{$t('breakdownInfo')}}
              v-btn.ma-0(
                text
                icon
                :loading='loading'
                @click='edit'
              )
                v-icon edit
              v-btn.ma-0(
                text
                icon
                @click='completeTodo()'
                :loading='loading'
                v-shortkey.once="{ en: ['d'], ru: ['в']}"
                @shortkey='completeTodo(true)'
              )
                v-icon done
        v-list-item-content.text-center.mt-4(
          v-if='!todo && !loading && !todoUpdating && todosCount > 0'
        )
          span.display-3 🎉
          span.headline {{$t('clear.congratulations')}}
          span.body-1 {{$t('clear.text')}}
        v-list-item-content.text-center.mt-4(
          v-if='!todo && !loading && !todoUpdating && todosCount === 0'
        )
          span.display-3 🐝
          span.headline {{$t('empty.action')}}
          span.body-1 {{$t('empty.text')}}
    EditTodo(
      :todo='todoEdited'
      :cleanTodo='cleanTodo'
      :requestDelete='requestDelete'
    )
    DeleteTodo(:todo='todoDeleted')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Todo } from '../models/todo'
import { getTodos, editTodo } from '../utils/api'
import * as store from '../plugins/store'
import TodoText from './TodoText.vue'
import DeleteTodo from './DeleteTodo.vue'
import EditTodo from './EditTodo.vue'
import { Watch } from 'vue-property-decorator'
import * as api from '../utils/api'
import { serverBus } from '../main'
import { decrypt } from '../utils/encryption'
import { i18n } from '../plugins/i18n'
import { playSound, Sounds } from '../utils/sounds'

@Component({
  components: {
    TodoText,
    DeleteTodo,
    EditTodo,
  },
})
export default class CurrentTodo extends Vue {
  showCompleted = false
  todo: Todo | null = null
  incompleteTodosCount = 0
  todosCount = 0

  loading = false

  todoEdited: Partial<Todo> | null = null
  todoDeleted: Todo | null = null

  get text() {
    if (this.todo?.encrypted) {
      return (
        decrypt(this.todo?.text, true) || i18n.t('encryption.errorDecrypting')
      )
    } else {
      return this.todo?.text
    }
  }

  get errorDecrypting() {
    if (this.todo?.encrypted) {
      return !decrypt(this.todo?.text, true)
    } else {
      return false
    }
  }

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
    serverBus.$on('refreshRequested', () => {
      this.updateTodo()
    })
  }

  todoUpdating = false
  async updateTodo() {
    if (this.todoUpdating) {
      return
    }
    const user = store.user()
    if (!user) {
      return
    }
    this.todoUpdating = true
    try {
      const fetched = await api.getCurrentTodo(user)
      this.todo = fetched.todo || null
      this.incompleteTodosCount = fetched.incompleteTodosCount
      this.todosCount = fetched.todosCount
    } catch (err) {
      store.setSnackbarError('errors.loadTodos')
    } finally {
      this.todoUpdating = false
    }
  }

  async completeTodo(hotkey = false) {
    if (hotkey && !store.hotKeysEnabled()) {
      return
    }
    const user = store.user()
    if (!user) {
      return
    }
    if (!this.todo) {
      return
    }
    this.loading = true
    try {
      await api.completeTodo(user, this.todo)
      if (this.todo.frog) {
        await playSound(Sounds.frogDone)
      } else {
        await playSound(Sounds.taskDone)
      }
      this.updateTodo()
      this.tryConfetti()
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async deleteTodo() {
    this.todoDeleted = this.todo ? { ...this.todo } : null
  }

  addTodo(hotkey = false) {
    if (hotkey && !store.hotKeysEnabled()) {
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

  async skipTodo() {
    const user = store.user()
    if (!user) {
      return
    }
    if (!this.todo) {
      return
    }
    this.loading = true
    try {
      await api.skipTodo(user, this.todo)
      this.updateTodo()
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
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
