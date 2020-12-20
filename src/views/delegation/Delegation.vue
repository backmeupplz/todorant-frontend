<template lang="pug">
div
  .v-container.pa-4
    v-row.mx-0.mb-4
      v-btn.mr-1(icon, @click='settingsDialog = true', :loading='loading')
        v-icon supervisor_account
      v-btn(icon, @click='loadData', :loading='loading')
        v-icon refresh
    div(v-if='!loading')
      NoDelegators(v-if='!delegators.length')
      NoDelegatedTasks(v-if='delegators.length && !unacceptedTodos.length')
      v-list-item.pa-0(v-for='(todo, i) in unacceptedTodos', :key='i')
        v-list-item-content
          v-card
            v-card-text
              TodoText(
                :todo='todo',
                :text='todo.text',
                :errorDecrypting='false',
                :delegateScreen='true'
              )
            v-card-actions.pb-2.pt-2.ma-0
              v-spacer
              v-btn(text, small, @click='deleteTodo(todo)', :loading='loading') {{ $t("delete") }}
              v-btn(text, small, @click='editTodo(todo)', :loading='loading') {{ $t("edit") }}
              v-btn(
                text,
                small,
                @click='acceptTodo(todo)',
                :loading='loading',
                :disabled='!todo.monthAndYear'
              ) {{ $t("accept") }}
  DelegationSettings(:dialog='settingsDialog', :close='closeSettingsDialog')
  EditTodo(
    :todo='todoEdited',
    :cleanTodo='cleanTodo',
    :requestDelete='requestDelete'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DelegationSettings from '@/views/delegation/DelegationSettings.vue'
import NoDelegators from '@/views/delegation/NoDelegators.vue'
import NoDelegatedTasks from '@/views/delegation/NoDelegatedTasks.vue'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { serverBus } from '@/main'
import * as api from '@/utils/api'
import { sockets } from '@/utils/sockets'
import { Todo } from '@/models/Todo'
import TodoText from '@/components/TodoCard/TodoText.vue'
import EditTodo from '@/views/EditTodo.vue'

const AppStore = namespace('AppStore')
const DelegationStore = namespace('DelegationStore')
const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    DelegationSettings,
    NoDelegators,
    NoDelegatedTasks,
    TodoText,
    EditTodo,
  },
})
export default class Delegation extends Vue {
  @AppStore.State dark!: boolean
  @DelegationStore.State delegates!: User[]
  @DelegationStore.State delegators!: User[]
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false
  settingsDialog = false

  unacceptedTodos = [] as Todo[]
  todoEdited: Partial<Todo> | null = null

  mounted() {
    this.loadData()
  }

  created() {
    serverBus.$on('refreshRequested', () => {
      this.loadData()
    })
  }

  cardClass(todo: Todo) {
    const dark = this.dark
    return dark ? 'grey darken-2' : 'grey lighten-4'
  }

  closeSettingsDialog() {
    this.settingsDialog = false
  }

  async loadData() {
    if (this.loading) {
      return
    }
    this.loading = true
    try {
      sockets.delegationSyncManager.sync()
      await this.getUnacceptedTodos()
    } catch (err) {
      // Don's show request abort
      if (err.message.includes('aborted')) {
        return
      }
      this.setSnackbarError('errors.loadTodos')
    } finally {
      this.loading = false
    }
  }

  async getUnacceptedTodos() {
    this.unacceptedTodos = await api.getUnacceptedDelegated()
  }

  async deleteTodo(todo: Todo) {
    if (this.loading) {
      return
    }
    this.loading = true
    try {
      await api.deleteTodo(todo)
      await this.getUnacceptedTodos()
    } catch (err) {
      // Don's show request abort
      if (err.message.includes('aborted')) {
        return
      }
      this.setSnackbarError('errors.loadTodos')
    } finally {
      this.loading = false
    }
  }

  editTodo(todo: Todo) {
    const propsTodo = { ...todo } as Partial<Todo>
    if (!propsTodo || !propsTodo.date) {
      this.todoEdited = propsTodo
      return
    }
    propsTodo.date = `${propsTodo.monthAndYear}-${propsTodo.date}`
    propsTodo.monthAndYear = undefined
    this.todoEdited = propsTodo
  }

  cleanTodo() {
    this.todoEdited = null
  }

  requestDelete(todo: Todo) {
    this.deleteTodo(todo)
  }

  async acceptTodo(todo: Todo) {
    if (this.loading) {
      return
    }
    this.loading = true
    try {
      await api.acceptDelegateTodo(todo)
      await this.getUnacceptedTodos()
    } catch (err) {
      // Don's show request abort
      if (err.message.includes('aborted')) {
        return
      }
      this.setSnackbarError('errors.loadTodos')
    } finally {
      this.loading = false
    }
  }
}
</script>
