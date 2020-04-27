<template lang="pug">
  v-dialog(v-model='dialog'
  persistent
  scrollable
  max-width='600px')
    v-form(ref='form')
      v-card
        v-card-title
          span.headline {{$t('todo.edit.title')}}
        v-card-text
          v-container
            TodoForm(v-if='!!todo'
            :todo='todo'
            :enterPressed='save' 
            :escapePressed='escapePressed'
            :hideAddToTheTop='true')
        v-card-actions
          v-btn(text
          @click='deleteTodo'
          :loading='loading'
          color='error')
            v-icon delete
          v-spacer
          v-btn(color='error'
          text 
          @click='cleanTodo(false)'
          :disabled='loading'
          v-shortkey.once="['esc']"
          @shortkey='dialog=false') {{$t('cancel')}}
          v-btn(color='blue'
          text 
          @click='save'
          :loading='loading'
          v-shortkey.once="['shift', 'enter']"
          @shortkey='save') {{$t('save')}}
    // Breakdown
    BreakdownRequest(:dialog='breakdownRequestDialog'
    :close='closeBreakdownRequestDialog'
    :breakdown='breakdownRequest')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import TodoForm from './TodoForm.vue'
import { Todo } from '../models/todo'
import BreakdownRequest from './BreakdownRequest.vue'
import * as store from '../plugins/store'
import * as api from '../utils/api'
import { serverBus } from '../main'

@Component({
  components: { TodoForm, BreakdownRequest },
  props: {
    todo: Object,
    cleanTodo: Function,
    requestBreakdown: Function,
    requestDelete: Function,
  },
})
export default class EditTodo extends Vue {
  loading = false
  dialog = false

  breakdownRequestDialog = false

  initialMonthAndYear = ''
  initialDate = ''

  @Watch('todo')
  onTodoChanged(val: Todo, oldVal: Todo) {
    this.dialog = !!val
    if (!oldVal && val) {
      this.reset()
      this.initialMonthAndYear = val.monthAndYear
      this.initialDate = val.date
    }
  }

  reset() {
    if (this.$refs.form) {
      ;(this.$refs.form as any).resetValidation()
    }
  }

  async save() {
    const user = store.user()
    if (!user) {
      return
    }
    if (!(this.$refs.form as any).validate()) {
      return
    }
    this.loading = true
    try {
      if (
        (this as any).todo.frogFails > 2 &&
        (this.initialDate !== (this as any).todo.date ||
          this.initialMonthAndYear !== (this as any).todo.monthAndYear)
      ) {
        this.breakdownRequestDialog = true
        return
      }
      await api.editTodo(user, (this as any).todo)
      ;(this as any).cleanTodo()
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async deleteTodo() {
    const todo = this.$props.todo
    ;(this as any).cleanTodo(false)
    this.$props.requestDelete(todo)
  }

  escapePressed() {
    this.dialog = false
  }

  closeBreakdownRequestDialog() {
    this.breakdownRequestDialog = false
  }

  breakdownRequest() {
    this.breakdownRequestDialog = false
    ;(this as any).cleanTodo()
    serverBus.$emit('addTodoRequested', undefined, (this as any).todo)
  }
}
</script>
