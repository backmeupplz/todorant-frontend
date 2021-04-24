<template lang="pug">
v-container(style='maxWidth: 1000px;')
  v-list(subheader)
    v-list-item.background-colored.d-flex.align-center.no-margin-no-padding(
      dense
    )
      v-switch.no-margin-no-padding(
        hide-details,
        v-model='delegatedTasksTo',
        :label='$t("todo.list.delegated")',
        :loading='loading'
      )
      v-row.justify-end
        v-btn.mr-1(icon, @click='settingsDialog = true', :loading='loading')
          v-icon supervisor_account
        v-btn(icon, @click='loadData', :loading='loading')
          v-icon refresh
  div(v-if='!loading')
    NoDelegation(
      :delegatedByMe='delegatedTasksTo',
      v-if='!delegationList.length'
    )
    NoDelegatedTasks(
      :delegatedTasksTo='delegatedTasksTo',
      v-if='!delegationMap.length && delegationList.length'
    )
    v-expansion-panels(flat, multiple, v-model='panels')
      v-expansion-panel.no-margin-no-padding(
        v-for='(todoSection, i) in delegationMap',
        :key='i'
      )
        v-expansion-panel-header.no-margin-no-padding
          PlanningHeader(
            :todoSection='todoSection',
            :loading='loading',
            :getPanels='getPanels',
            :setPanels='setPanels',
            :panelIndex='i',
            :delegation='true'
          )
        v-expansion-panel-content.no-margin-no-padding
          v-list-item.pa-0(
            dense,
            v-for='(todo, j) in todoSection.todos',
            :key='j'
          )
            v-list-item-content
              TodoCard(
                :type='delegatedTasksTo ? "delegatedByMe" : "delegatedToMe"',
                :deleteTodo='() => deleteTodo(todo)',
                :addTodo='() => breakdownTodo(todo)',
                :completeTodo='() => completeOrUndoTodo(todo)',
                :repeat='() => completeOrUndoTodo(todo)',
                :edit='() => editTodo(todo)',
                :moveTodoToToday='() => moveTodoToToday(todo)',
                :acceptTodo='() => acceptTodo(todo)',
                :todo='todo',
                :loading='loading',
                editable=false
              )
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
import NoDelegation from '@/views/delegation/NoDelegation.vue'
import NoDelegatedTasks from '@/views/delegation/NoDelegatedTasks.vue'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { serverBus } from '@/main'
import * as api from '@/utils/api'
import { sockets } from '@/utils/sockets'
import { Todo } from '@/models/Todo'
import TodoText from '@/components/TodoCard/TodoText.vue'
import EditTodo from '@/views/EditTodo.vue'
import TodoCard from '@/components/TodoCard/TodoCard.vue'
import { CardType } from '@/models/CardType'
import PlanningHeader from '@/views/planning/PlanningHeader.vue'

const AppStore = namespace('AppStore')
const DelegationStore = namespace('DelegationStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    DelegationSettings,
    NoDelegation,
    NoDelegatedTasks,
    TodoText,
    EditTodo,
    TodoCard,
    PlanningHeader,
  },
})
export default class Delegation extends Vue {
  @AppStore.State dark!: boolean
  @DelegationStore.State delegates!: User[]
  @DelegationStore.State delegators!: User[]
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false
  settingsDialog = false
  delegatedTasksTo = true

  delegatedToMeMap: any[] = []
  delegatedByMeMap: any[] = []

  unacceptedTodos = [] as Todo[]
  delegatedTodos = [] as Todo[]
  todoEdited: Partial<Todo> | null = null

  get delegationMap() {
    return this.delegatedTasksTo ? this.delegatedByMeMap : this.delegatedToMeMap
  }

  get delegationList() {
    return this.delegatedTasksTo ? this.delegators : this.delegates
  }

  get panels() {
    const delegationTodos = this.delegatedTasksTo
      ? this.delegatedByMeMap
      : this.delegatedToMeMap
    const result = [] as number[]
    delegationTodos.forEach((section, i) => {
      if (true) {
        result.push(i)
      }
    })
    return result
  }

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

  getPanels() {
    return this.panels
  }

  setPanels(panels: number[]) {
    this.panels = panels
  }
  set panels(panels: number[]) {}

  async loadData() {
    if (this.loading) {
      return
    }
    this.loading = true
    try {
      await sockets.delegationSyncManager.sync()
      await this.getUnacceptedTodos()
      await this.getDelegatedTodos()
    } catch (err) {
      console.log(err)
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
    const mappedTodos = this.unacceptedTodos.reduce((prev, cur) => {
      const name = cur.delegator?.name
      if (!name) return prev
      if (prev[name]) {
        prev[name].push(cur)
      } else {
        prev[name] = [cur]
      }
      return prev
    }, {} as { [index: string]: Todo[] })
    this.delegatedToMeMap = []
    for (const key in mappedTodos) {
      this.delegatedToMeMap.push({
        title: key,
        todos: mappedTodos[key],
      })
    }
  }

  async getDelegatedTodos() {
    const delegatedTodos = await api.getDelegatedTodos()
    const mappedTodos = delegatedTodos.reduce((prev, cur) => {
      const name = cur.user?.name
      if (!name) return prev
      if (prev[name]) {
        prev[name].push(cur)
      } else {
        prev[name] = [cur]
      }
      return prev
    }, {} as { [index: string]: Todo[] })
    this.delegatedByMeMap = []
    for (const key in mappedTodos) {
      this.delegatedByMeMap.push({
        title: key,
        todos: mappedTodos[key],
      })
    }
    this.delegatedTodos = delegatedTodos
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
