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
              @click='validateAndSave',
              :loading='loading',
              v-shortkey.once='["shift", "enter"]',
              @shortkey.native='validateAndSave'
            ) {{ $t("save") }}
  // Breakdown
  BreakdownRequest(
    :dialog='breakdownRequestDialog',
    :close='closeBreakdownRequestDialog',
    :breakdown='breakdownRequest',
    :moveTodo='moveTodo',
    :futureSkippedTodo='futureSkippedTodo'
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
import { SubscriptionStatus } from '@/models/SubscriptionStatus'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')
const AppStore = namespace('AppStore')

@Component({
  components: { TodoForm, BreakdownRequest },
})
export default class EditTodo extends Vue {
  @Prop({ required: true }) todo!: Todo
  @Prop({ required: true }) cleanTodo!: () => void
  @Prop({ required: true }) requestDelete!: (todo: Todo) => void

  @UserStore.State user?: User
  @UserStore.State subscriptionStatus!: SubscriptionStatus
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @AppStore.Mutation setDialog!: (dialog: boolean) => void

  loading = false
  dialog = false

  breakdownRequestDialog = false

  initialMonthAndYear = ''
  initialDate = ''

  completed = false
  futureSkippedTodo = false

  @Watch('todo')
  onTodoChanged(val: Todo, oldVal: Todo) {
    if (this.subscriptionStatus === SubscriptionStatus.inactive) {
      serverBus.$emit('subscriptionRequested')
    } else {
      this.dialog = !!val
      this.setDialog(this.dialog)
      if (!oldVal && val) {
        this.completed = val.completed
        this.reset()
        this.initialMonthAndYear = val.monthAndYear
        this.initialDate = val.date
      }
    }
  }

  reset() {
    if (this.$refs.form) {
      ;(this.$refs.form as any).resetValidation()
    }
  }

  async validateAndSave() {
    const user = this.user
    if (!user) {
      return
    }
    if (!this.todo) return
    if (!(this.$refs.form as any).validate()) {
      return
    }
    this.loading = true
    if (
      // Check how many times frog was failed
      this.todo.frogFails > 2 &&
      (this.initialDate !== this.todo.date ||
        this.initialMonthAndYear !== this.todo.monthAndYear)
    ) {
      this.breakdownRequestDialog = true
      return
    } else if (
      // Check how many times todo was skipped
      this.todo.futureSkips >= 5 &&
      new Date(this.initialDate || this.initialMonthAndYear) <
        new Date(this.todo.date || this.todo.monthAndYear)
    ) {
      this.futureSkippedTodo = true
      this.breakdownRequestDialog = true
      return
    }
    this.save(this.todo, user)
  }

  async save(todo: Todo, user: User) {
    try {
      const { incompleteFrogsExist } = await api.editTodo(user, todo)
      this.cleanTodo()
      if (todo.completed && !this.completed) {
        playSound(todo.frog ? Sounds.levelUp : Sounds.taskDone)
        if (todo.frog) return
        if (incompleteFrogsExist) {
          serverBus.$emit('violationFrogRules')
        }
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

  moveTodo() {
    this.closeBreakdownRequestDialog()
    if (!this.user) return
    this.save(this.todo, this.user)
  }

  closeBreakdownRequestDialog() {
    this.breakdownRequestDialog = false
    this.futureSkippedTodo = false
    this.loading = false
  }

  breakdownRequest() {
    this.closeBreakdownRequestDialog()
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
