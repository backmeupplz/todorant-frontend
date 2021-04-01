<template lang="pug">
v-dialog(v-model='dialog', persistent, scrollable, max-width='600px')
  v-form(ref='form')
    v-card
      v-card-title
        span.headline {{ $t("todo.edit.title") }}
        v-spacer
        v-icon.grey--text.pl-2(small, v-if='todo && todo.encrypted') vpn_key
      v-card-text
        TodoForm(
          v-if='!!todo',
          :todo='todo',
          :enterPressed='save',
          :escapePressed='escapePressed',
          :editTodo='true',
          :shouldAutofocus='dialog',
          ref='todoForm'
        )
      v-card-actions
        .d-flex.justify-space-between.flex-column.flex-md-row(
          style='width: 100%'
        )
          .todo-form-left-action
            v-btn.button-gradient(
              @click='deleteTodo',
              :loading='loading',
              fab,
              small,
              elevation=0,
              dark,
              color='error'
            )
              v-icon delete
          .todo-form-right-action.d-flex.flex-column.flex-md-row
            v-btn.button-round(
              color='error',
              text,
              elevation=0,
              @click='cleanTodo(false)',
              :disabled='loading',
              v-shortkey.once='["esc"]',
              @shortkey.native='escapePressed'
            ) {{ $t("cancel") }}
            v-btn.button-round.button-gradient(
              color='primary',
              elevation=0,
              @click='save',
              :loading='loading',
              v-shortkey.once='["shift", "enter"]',
              @shortkey.native='save'
            ) {{ $t("save") }}
  // Breakdown
  BreakdownRequest(
    :dialog='breakdownRequestDialog',
    :close='closeBreakdownRequestDialog',
    :breakdown='breakdownRequest'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'
import TodoForm from '@/components/TodoForm/TodoForm.vue'
import { Todo } from '@/models/Todo'
import BreakdownRequest from '@/components/BreakdownRequest.vue'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { playSound, Sounds } from '@/utils/sounds'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: { TodoForm, BreakdownRequest },
})
export default class EditTodo extends Vue {
  @Prop({ required: true }) todo!: Todo
  @Prop({ required: true }) cleanTodo!: () => void
  @Prop({ required: true }) requestDelete!: (todo: Todo) => void

  @UserStore.State user?: User
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false
  dialog = false

  breakdownRequestDialog = false

  initialMonthAndYear = ''
  initialDate = ''

  completed = false

  @Watch('todo')
  onTodoChanged(val: Todo, oldVal: Todo) {
    this.dialog = !!val
    if (!oldVal && val) {
      this.completed = val.completed
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
    const user = this.user
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
      if ((this as any).todo.completed && !this.completed) {
        playSound((this as any).todo.frog ? Sounds.levelUp : Sounds.taskDone)
      }
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async deleteTodo() {
    const todo = this.todo
      ;(this as any).cleanTodo(false)
    this.requestDelete(todo)
  }

  escapePressed() {
    if (this.$refs.todoForm) {
      ;(this.$refs.todoForm as any).$refs.textInput.blur()
    }
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

<style lang="scss" scoped>
.v-expansion-panel-header {
  padding: 16px 0 !important;
}
.v-card__title {
  padding: 20px 30px !important;
}
.button-gradient {
  background: linear-gradient(135deg, #1148b9 0%, #5c9bff 100%) !important;
}
.v-card__text {
  padding: 0 30px 20px 30px !important;
}
.v-card__actions {
  padding: 20px 30px !important;
}
.v-application .headline {
  font-family: Montserrat, Roboto !important;
}
.v-expansion-panel {
  background-color: transparent !important;
}
.button-round {
  border-radius: 12px !important;
  padding: 8px 16px !important;
}
</style>