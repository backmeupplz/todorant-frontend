<template lang="pug">
div(translate='no')
  v-btn.fab(
    :absolute='$vuetify.breakpoint.mdAndUp && currentTab == 0 && !planning',
    :fixed='$vuetify.breakpoint.smAndDown || currentTab != 0 || planning',
    :class='$vuetify.breakpoint.mdAndUp && (currentTab != 0 || planning) ? "rightPadding" : ""',
    dark,
    fab,
    bottom,
    right,
    color='blue',
    @click='openDialog()',
    v-hotkey='keymap',
    aria-label='Add todo'
  )
    v-icon $add
  v-dialog(v-model='dialog', persistent, scrollable, max-width='600px')
    v-form(ref='form')
      v-card
        v-card-title
          span.headline {{ $t("todo.create.title") }}
          v-spacer
          v-tooltip(bottom, :max-width='300')
            template(v-slot:activator='{ on }')
              v-icon(v-on='on') info
            span {{ $t("todo.create.tooltip") }}
        v-card-text
          .d-flex.justify-space-between
            p.todoText(
              v-if='!!todoToBreakdown',
              :class='isEncryptionWrong(todoToBreakdown) ? "grey--text" : ""'
            ) {{ textForTodo(todoToBreakdown) }}
            v-btn(
              v-if='!!todoToBreakdown',
              icon,
              v-clipboard:copy='!todoToBreakdown ? "no-todo" : textForTodo(todoToBreakdown)'
            )
              v-icon(small) assignment
          v-expansion-panels(multiple, v-model='panel')
            v-flex
              draggable(
                :forceFallback='shouldFallbackDraggable',
                v-model='todos',
                handle='.handle'
              )
                v-expansion-panel(v-for='(todo, i) in todos', :key='i')
                  v-expansion-panel-header
                    v-flex.column
                      h2.todo-title {{ !panel.includes(i) ? `${todo.frog ? "🐸 " : ""}${todo.time ? `${todo.time} ` : ""}` : "" }}{{ panel.includes(i) || !todo.text ? $t("todo.create.placeholder") : cutTitle(todo.text) }}
                      p.my-0.caption(v-if='!panel.includes(i) && todo.date') {{ todo.date }}
                    div
                      .d-flex.justify-end.ma-2
                        v-icon.handle(v-if='todos.length > 1') menu
                  v-expansion-panel-content
                    TodoForm(
                      :todo='todo',
                      :escapePressed='escapePressed',
                      :addTodo='addTodo',
                      ref='todoForm',
                      :shouldAutofocus='dialog'
                    )
                      v-btn(
                        v-if='todos.length > 1',
                        color='error',
                        text,
                        @click='deleteTodo(i)'
                      ) {{ $t("delete") }}
        v-card-actions(v-hotkey.forbidden='addMoreKeymap')
          .d-flex.justify-space-between.flex-column.flex-md-row(
            style='width: 100%'
          )
            .todo-form-left-action
              v-btn.button-gradient(
                color='primary',
                fab,
                small,
                elevation=0,
                dark,
                @click='addTodo'
              )
                v-icon add
            .todo-form-right-action.d-flex.flex-column.flex-md-row
              v-btn.button-round(
                color='error',
                text,
                elevation=0,
                @click='close',
                :disabled='loading',
                v-hotkey='keymap'
              ) {{ $t("cancel") }}
              v-btn.button-round.button-gradient(
                color='primary',
                dark,
                elevation=0,
                @click='save(false)',
                :loading='loading',
                v-hotkey.prevent.forbidden='newLineKeymap'
              ) {{ $t("save") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch, Prop } from 'vue-property-decorator'
import TodoForm from '@/components/TodoForm/TodoForm.vue'
import { Todo } from '@/models/Todo'
import { l } from '@/utils/linkify'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { logEvent } from '@/utils/logEvent'
import { linkify } from '@/utils/linkify'
import { encrypt, decrypt } from '@/utils/encryption'
import { i18n } from '@/plugins/i18n'
import { namespace } from 'vuex-class'
import { SubscriptionStatus } from '@/models/SubscriptionStatus'
import { User } from '@/models/User'
import draggable from 'vuedraggable'
import { playSound, Sounds } from '@/utils/sounds'
import { getTodayWithStartOfDay } from '@/utils/time'
import { debounce } from 'lodash'

const SettingsStore = namespace('SettingsStore')
const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')
const AppStore = namespace('AppStore')

@Component({
  components: { TodoForm, draggable },
})
export default class AddTodo extends Vue {
  @Prop({ required: true }) currentTab!: number

  @SettingsStore.State hotKeysEnabled!: boolean
  @SettingsStore.State duplicateTagInBreakdown?: boolean
  @SettingsStore.State newTodosGoFirst?: boolean
  @SettingsStore.State showTodayOnAddTodo?: boolean
  @SettingsStore.State newLineOnReturn!: boolean
  @UserStore.State subscriptionStatus!: SubscriptionStatus
  @UserStore.State user?: User
  @UserStore.State password?: string
  @UserStore.State planning!: boolean
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @AppStore.State todoDialog!: boolean

  dialog = false

  panel = [] as Number[]

  todos = [] as Partial<Todo & { goFirst: boolean }>[]

  loading = false

  date = ''

  todoToBreakdown: null | Todo = null

  shiftUpBeforeEnter = false

  get shouldFallbackDraggable() {
    return navigator.userAgent.toLowerCase().indexOf('safari') > -1
  }

  debouncedSave = debounce(() => this.save(true))

  get addMoreKeymap() {
    return {
      'ctrl+shift+a': () => this.addTodo(true),
    }
  }

  get newLineKeymap() {
    return {
      enter: {
        keyup: () => {
          if (this.newLineOnReturn) return
          this.debouncedSave()
        },
      },
      'shift+enter': {
        keyup: () => {
          if (!this.newLineOnReturn) return
          this.debouncedSave()
        },
      },
    }
  }

  get keymap() {
    return {
      a: this.openDialog,
      esc: this.close,
    }
  }

  created() {
    serverBus.$on('shiftBeforeEnter', () => {
      this.shiftUpBeforeEnter = true
    })
    serverBus.$on(
      'addTodoRequested',
      (date?: string, todoToBreakdown?: Todo) => {
        if (this.subscriptionStatus === SubscriptionStatus.inactive) {
          serverBus.$emit('subscriptionRequested')
        } else {
          if (date) {
            this.date = date
          }
          if (todoToBreakdown) {
            this.todoToBreakdown = todoToBreakdown
          }
          this.dialog = true
        }
      }
    )
  }

  mounted() {
    logEvent('add_todo_opened')
  }

  @Watch('dialog')
  onDialogChanged(val: boolean, oldVal: boolean) {
    this.reset()
    if (oldVal && !val) {
      this.todoToBreakdown = null
    }
  }

  openDialog(hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) {
      return
    }
    if (this.todoDialog) return
    if (this.subscriptionStatus === SubscriptionStatus.inactive) {
      serverBus.$emit('subscriptionRequested')
    } else {
      this.dialog = true
    }
  }

  reset() {
    this.todos = []
    this.addTodo()
    this.panel = [0]
    if (this.$refs.form) {
      ;(this.$refs.form as any).resetValidation()
    }
  }

  addTodo(hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) return
    let repetitiveTodoText = ''
    let hashtags = [] as string[]
    if (this.todoToBreakdown) {
      let text = this.todoToBreakdown.text
      if (this.todoToBreakdown.encrypted) {
        text = decrypt(this.todoToBreakdown.text, true) || ''
      }
      const matches = linkify.match(text) || []
      if (this.todos.length === 0 && this.todoToBreakdown.repetitive) {
        repetitiveTodoText = text
      }
      if (this.duplicateTagInBreakdown) {
        hashtags = matches
          .map((v) =>
            /^#[\u0400-\u04FFa-zA-Z_0-9]+$/u.test(v.url) ? v.url : undefined
          )
          .filter((v) => !!v) as string[]
      }
    }
    if (this.date) {
      this.todos.push({
        date: this.date,
        goFirst: this.newTodosGoFirst || false,
        text: repetitiveTodoText || hashtags.join(' '),
        repetitive: this.todoToBreakdown?.repetitive || false,
      })
    } else if (this.showTodayOnAddTodo) {
      const now = getTodayWithStartOfDay()
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
      this.todos.push({
        date: now.toISOString().substr(0, 10),
        goFirst: this.newTodosGoFirst || false,
        text: repetitiveTodoText || hashtags.join(' '),
        repetitive: this.todoToBreakdown?.repetitive || false,
      })
    } else {
      this.todos.push({
        goFirst: this.newTodosGoFirst || false,
        text: repetitiveTodoText || hashtags.join(' '),
        repetitive: this.todoToBreakdown?.repetitive || false,
      })
    }
    this.panel = [this.todos.length - 1]
    logEvent('add_todo_add_more')
  }

  deleteTodo(i: number) {
    this.todos.splice(i, 1)
  }

  async save(hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) return
    if (hotkey && this.shiftUpBeforeEnter) {
      this.shiftUpBeforeEnter = false
      return
    }
    const user = this.user
    if (!user) {
      return
    }
    this.panel = []
    this.todos.forEach((todo, i) => {
      if (
        !todo ||
        !todo.text ||
        !todo.text.trim() ||
        (!todo.monthAndYear && !todo.date && !todo.delegator)
      ) {
        this.panel.push(i)
      }
    })
    if (!(this.$refs.form as any).validate()) {
      return
    }
    if (this.panel.length) {
      this.setSnackbarError('errors.invalidForm')
      return
    }
    this.loading = true
    try {
      await api.postTodos(
        user,
        this.todos.map((todo) => {
          const iTodo = { ...todo }
          iTodo.text = iTodo.text!.trim()
          if (!!this.password && !iTodo.delegator) {
            iTodo.encrypted = true
            iTodo.text = encrypt(iTodo.text)
          }
          return iTodo
        })
      )
      const hasCompletedTodo =
        !!this.todoToBreakdown ||
        this.todos.reduce((p, c) => !!c.completed || p, false as boolean)
      const hasFrog =
        (!!this.todoToBreakdown && this.todoToBreakdown.frog) ||
        this.todos.reduce((p, c) => !!c.frog || p, false as boolean)
      if (this.todoToBreakdown) {
        const tempTodo = this.todoToBreakdown
        this.todoToBreakdown = null
        await api.completeTodo(user, tempTodo)
      }
      if (hasCompletedTodo) {
        playSound(hasFrog ? Sounds.levelUp : Sounds.taskDone)
      }
      if (this.$refs.todoForm && (this.$refs.todoForm as any).length) {
        for (const ref of this.$refs.todoForm as any) {
          ref.$refs.textInput.blur()
        }
      }
      this.dialog = false
      logEvent('add_todo_success')
    } catch (err) {
      this.setSnackbarError(err.response.data)
      logEvent('add_todo_error', { error: err.message })
    } finally {
      this.loading = false
    }
  }

  escapePressed() {
    this.close()
  }

  textForTodo(todo: Todo) {
    if (todo.encrypted) {
      return decrypt(todo.text, true) || i18n.t('encryption.errorDecrypting')
    } else {
      return todo.text
    }
  }

  isEncryptionWrong(todo: Todo) {
    if (todo.encrypted) {
      return !decrypt(todo.text, true)
    } else {
      return false
    }
  }

  close() {
    this.panel = []
    this.date = ''
    if (this.$refs.todoForm && (this.$refs.todoForm as any).length) {
      for (const ref of this.$refs.todoForm as any) {
        ref.$refs.textInput.blur()
      }
    }
    this.dialog = false
  }

  cutTitle(title: string) {
    let todoTitle = ''
    const todoTitleRaw = l(title)
    todoTitleRaw.forEach((item) => {
      todoTitle += item.value
    })
    return todoTitle.length > 100
      ? todoTitle.substring(0, 100) + '...'
      : todoTitle
  }
}
</script>

<style lang="sass" scoped>
// prettier-ignore
@for $i from 1 through 50
  @media screen and (min-width: (1000px + ($i * 100px))) and (max-width: 1100px + ($i * 100px))
    .rightPadding
      right: ((100 + ($i * 100)) / 2) !important
.todoText
  overflow-wrap: anywhere
.fab
  background: linear-gradient(135deg, #1148B9 0%, #5C9BFF 100%) !important
  border-radius: 28px !important
  width: 48px !important
  height: 64px !important
.v-expansion-panel::before
  box-shadow: none
.todo-title
  word-break: break-word
  font-size: 18px
  font-weight: 600
.button-round
  border-radius: 12px !important
  padding: 8px 16px !important
.button-gradient
  background: linear-gradient(135deg, #1148B9 0%, #5C9BFF 100%) !important
.v-expansion-panel-header
  padding: 16px 0 !important
.v-card__title
  padding: 20px 30px !important
.v-card__text
  padding: 0 30px 20px 30px !important
.v-card__actions
  padding: 20px 30px !important
.v-application .headline
  font-family: Montserrat, Roboto !important
.v-expansion-panel
  background-color: transparent !important
</style>
