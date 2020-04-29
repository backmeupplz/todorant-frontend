<template lang="pug">
  v-container(style='maxWidth: 1000px;')
    v-list(subheader)
      v-list-item(v-if='$store.state.userState.planning').pt-4
        v-flex
          v-alert(text color='info' icon='info') {{$t('todo.planning')}}
      v-list-item.d-flex.align-center(:style='stickyHeaderStyle')
        v-switch.ma-0.pa-0(v-if='!calendarViewEnabled'
        hide-details v-model='showCompleted'
        :label='$t("todo.list.completed")'
        :loading='todosUpdating'
        :disabled='editable')
        v-spacer
        v-btn(v-if='!editable && !showCompleted' icon @click='toggleCalendar' :color='calendarViewEnabled ? "blue" : ""' :loading='todosUpdating || loading')
          v-icon calendar_today
        v-btn(v-if='!editable && !showCompleted' icon :loading='todosUpdating' @click='editable = true')
          v-icon format_list_numbered
        v-btn(v-if='!!editable' icon :loading='todosUpdating || loading' @click='editable = false')
          v-icon clear
        v-btn(v-if='!!editable' icon :loading='todosUpdating || loading' @click='doneEditing' color='green')
          v-icon done
        v-btn(icon :loading='todosUpdating' @click='loadTodos')
          v-icon refresh
      v-list-item(v-if='calendarViewEnabled && todosUpdating' flex)
        v-progress-linear(:indeterminate='true')
      v-list-item(v-if='calendarViewEnabled' flex :class='editable ? "editable" : "non-editable"')
        calendar-view(:events='events'
        :locale='locale'
        :startingDayOfWeek='firstDayOfWeek'
        :showDate='currentPeriod'
        :class='$store.state.dark ? "dark" : "light"'
        :enableDragDrop='editable'
        @click-event="editEvent"
        @drop-on-date='moveDate')
          calendar-view-header(v-if='!editable'
          slot="header"
          slot-scope="{ headerProps }"
          :header-props="headerProps"
          @input='(date) => currentPeriod = date')
      v-expansion-panels(v-else flat multiple v-model='panels')
        v-expansion-panel.my-0.py-0(v-for='(todoSection, i) in todos' :key='i')
          v-expansion-panel-header.py-0.px-6(v-observe-visibility='(isVisible, entry) => headerVisibilityChanged(isVisible, entry, i)')
            v-subheader.pa-0
              v-tooltip(right :max-width='300' v-if='todoSection.title.length === 10')
                template(v-slot:activator='{ on }')
                  span(v-on='on') {{todoSection.title}}{{!panels.includes(i) ? ` (${todoSection.todos.length})` : ''}}
                span {{$t(weekdayFromTitle(todoSection.title))}}{{!panels.includes(i) ? ` (${todoSection.todos.length})` : ''}}
              span(v-else) {{todoSection.title}}
          v-expansion-panel-content
            draggable(v-model='todoSection.todos'
            group='todo'
            @start='drag=true'
            @end='drag=false'
            v-bind="dragOptions"
            handle='.handle')
              v-list-item(v-for='(todo, j) in todoSection.todos'
              :key='j'
              v-observe-visibility='(isVisible, entry) => visibilityChanged(isVisible, entry, i, j)').pa-0
                v-list-item-content
                  v-card(:class='cardClass(todo)')
                    v-card-text(:class='!editable ? "px-3 pt-2 pb-0 ma-0" : ""')
                      v-row(no-gutters)
                        .handle.pr-3(v-if='editable && todo.frogFails < 3')
                          v-icon menu
                        TodoText(:todo='todo')
                    v-card-actions.pb-2.pt-2.ma-0(v-if='!editable')
                      v-icon(v-if='todoOutstanding(todo)') error_outline
                      v-col(no-gutters).px-2.py-0.ma-0
                        v-row
                          span.caption.grey--text.pl-2 {{$t('created')}} {{todo.createdAt.substr(0, 10)}}
                        v-row
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
      v-progress-linear(v-if='todosUpdating && !calendarViewEnabled' :indeterminate='true')
    EditTodo(:todo='todoEdited' :cleanTodo='cleanTodo' :requestBreakdown='requestBreakdown'
    :requestDelete='requestDelete')
    DeleteTodo(:todo='todoDeleted')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Todo } from '../models/todo'
import { getTodos, editTodo } from '../utils/api'
import * as store from '../plugins/store'
import EditTodo from './EditTodo.vue'
import DeleteTodo from './DeleteTodo.vue'
import TodoText from './TodoText.vue'
import { Watch } from 'vue-property-decorator'
import * as api from '../utils/api'
import { serverBus } from '../main'
import draggable from 'vuedraggable'
import { TodoSection } from '../models/TodoSection'
import { isTodoOld, isDateTooOld } from '../utils/isTodoOld'
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
import moment from 'moment'

@Component({
  components: {
    TodoText,
    EditTodo,
    DeleteTodo,
    draggable,
    CalendarView,
    CalendarViewHeader,
  },
})
export default class TodoList extends Vue {
  showCompleted = false
  todoEdited: Partial<Todo> | null = null
  todoDeleted: Todo | null = null
  todos = [] as TodoSection[]

  collapsedPanels = {} as { [index: string]: boolean }
  get panels() {
    const result = [] as number[]
    this.todos.forEach((section, i) => {
      if (!this.collapsedPanels[section.title]) {
        result.push(i)
      }
    })
    return result
  }
  set panels(panels: number[]) {
    const result = {} as { [index: string]: boolean }
    this.todos.forEach((section, i) => {
      if (!panels.includes(i)) {
        result[section.title] = true
      }
    })
    this.collapsedPanels = result
  }

  get events() {
    return this.todos
      .map((section) => {
        return section.todos
          .filter((todo) => !!todo.date)
          .map((todo) => ({
            id: todo._id,
            title: todo.text,
            startDate: section.title,
          }))
      })
      .reduce((p, c) => p.concat(c), [])
  }

  noMoreTodos = false

  loading = false
  drag = false

  calendarViewEnabled = false

  currentPeriod = new Date()

  get stickyHeaderStyle() {
    return {
      position: 'sticky',
      top: this.$vuetify.breakpoint.smAndDown ? 53 : 60,
      zIndex: 2,
      backgroundColor: store.dark() ? '#1e1e1e' : '#ffffff',
    }
  }

  @Watch('currentPeriod')
  onCurrentPeriodChanged(val: boolean, oldVal: boolean) {
    this.todos = []
    this.loadTodos()
  }

  get locale() {
    return store.language() === 'ua' ? 'uk' : store.language()
  }

  get editable() {
    return store.editting()
  }
  set editable(value: Boolean) {
    store.setEditting(value)
    if (value === false) {
      this.loadTodos()
    }
  }
  get weekdays() {
    const storeFirstDayOfWeek = this.$store.state.userState.settings
      .firstDayOfWeek
    const firstDay =
      storeFirstDayOfWeek === undefined
        ? this.$store.state.language === 'ru'
          ? 1
          : 0
        : storeFirstDayOfWeek
    const result = [firstDay]
    for (let i = 1; i < 7; i++) {
      result.push((firstDay + i) % 7)
    }
    return result
  }

  weekdayFromTitle(title: string) {
    const date = new Date(title)
    return `weekdays.${(date.getDay() +
      (date.getTimezoneOffset() > 0 ? 1 : 0)) %
      7}`
  }

  @Watch('showCompleted')
  onCompletedChanged(val: boolean, oldVal: boolean) {
    if (val === oldVal) return
    this.loadTodos()
  }

  mounted() {
    this.loadTodos()
  }

  created() {
    serverBus.$on('refreshRequested', () => {
      this.loadTodos()
    })
  }

  todoInFuture(todo: Todo) {
    return !isTodoOld(todo, api.getTomorrow())
  }

  todosUpdating = false
  async loadTodos(fullUpdate = true, more = false) {
    if (this.todosUpdating) {
      return
    }
    const user = store.user()
    if (!user) {
      return
    }
    this.todosUpdating = true
    try {
      const initialTodosLength = this.todos.length
      const fetchedTodos = await getTodos(
        user,
        this.showCompleted,
        more ? this.todos.reduce((prev, cur) => prev + cur.todos.length, 0) : 0,
        fullUpdate || more
          ? 20
          : this.todos.reduce((prev, cur) => prev + cur.todos.length, 0),
        this.$router.currentRoute.hash,
        this.calendarViewEnabled,
        this.calendarViewEnabled ? this.currentPeriod : undefined
      )
      this.noMoreTodos = fetchedTodos.length <= 0
      let allTodos = more
        ? this.todos
            .reduce(
              (prev, cur) =>
                prev.concat(
                  cur.todos.map((todo) => {
                    todo.monthAndYear = cur.title.substr(0, 7)
                    ;(todo as any).date =
                      cur.title.length === 10
                        ? cur.title.substr(8, 2)
                        : undefined
                    return todo
                  })
                ),
              [] as Todo[]
            )
            .concat(fetchedTodos)
        : fetchedTodos
      const mappedTodos = allTodos.reduce(
        (prev, cur) => {
          if (cur.date) {
            const date = `${cur.monthAndYear}-${cur.date}`
            if (prev[date]) {
              prev[date].push(cur)
            } else {
              prev[date] = [cur]
            }
          } else {
            const month = cur.monthAndYear
            if (prev[month]) {
              prev[month].push(cur)
            } else {
              prev[month] = [cur]
            }
          }
          return prev
        },
        {} as { [index: string]: Todo[] }
      )
      this.todos = [] as TodoSection[]
      for (const key in mappedTodos) {
        this.todos.push({
          title: key,
          todos: mappedTodos[key],
        })
      }
      const today = api.getToday()
      this.todos.sort((a, b) => {
        if (isDateTooOld(a.title, today) && !isDateTooOld(b.title, today)) {
          return -1
        } else if (
          !isDateTooOld(a.title, today) &&
          isDateTooOld(b.title, today)
        ) {
          return 1
        }
        return new Date(a.title) > new Date(b.title) ? 1 : -1
      })
      if (this.showCompleted) {
        this.todos.reverse()
      }
    } catch (err) {
      store.setSnackbarError('errors.loadTodos')
    } finally {
      this.todosUpdating = false
    }
  }

  editEvent(event: any) {
    if (this.editable) {
      return
    }
    const flatTodos = this.todos.reduce(
      (prev, cur) => prev.concat(cur.todos),
      [] as Todo[]
    )
    for (const todo of flatTodos) {
      if (todo._id === event.originalEvent.id) {
        this.editTodo(todo)
        return
      }
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

  async moveTodoToToday(todo: Todo) {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      const today = api.getToday()
      const monthAndYear = today.substr(0, 7)
      const date = today.substr(8)
      todo.monthAndYear = monthAndYear
      todo.date = date
      await api.editTodo(user, todo)
      this.loadTodos(false)
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  requestDelete(todo: Todo) {
    this.deleteTodo(todo)
  }

  async deleteTodo(todo: Todo) {
    this.todoDeleted = { ...todo } as Todo
  }

  async completeOrUndoTodo(todo: Todo) {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      if (todo.completed) {
        await api.undoTodo(user, todo)
      } else {
        await api.completeTodo(user, todo)
        this.tryConfetti()
      }
      this.loadTodos(false)
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  cleanTodo(needsReload = true) {
    this.todoEdited = null
    if (needsReload) {
      this.loadTodos(false)
    }
  }

  cardClass(todo: Todo) {
    const dark = store.dark()
    const outstanding = this.todoOutstanding(todo)
    return dark
      ? outstanding
        ? 'blue darken-3'
        : 'grey darken-2'
      : outstanding
      ? 'blue lighten-4'
      : 'grey lighten-4'
  }

  todoOutstanding(todo: Todo) {
    if (todo.completed) {
      return false
    }
    const today = api.getToday()
    return isTodoOld(todo, today)
  }

  get dragOptions() {
    return {
      animation: 0,
      disabled: !this.editable,
    }
  }

  async doneEditing() {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.rearrangeTodos(user, this.todos)
      await this.loadTodos(false)
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
      this.editable = false
    }
  }

  async visibilityChanged(
    isVisible: Boolean,
    entry: any,
    sectionIndex: number,
    rowIndex: number
  ) {
    if (!isVisible) {
      return
    }
    if (
      sectionIndex < this.todos.length - 1 ||
      rowIndex < this.todos[sectionIndex].todos.length - 1
    ) {
      return
    }
    if (this.todosUpdating || this.loading || this.noMoreTodos) {
      return
    }
    this.loadTodos(false, true)
  }

  headerVisibilityChanged(
    isVisible: Boolean,
    entry: any,
    sectionIndex: number
  ) {
    if (!isVisible) {
      return
    }
    if (this.panels.includes(sectionIndex)) {
      return
    }
    if (sectionIndex < this.todos.length - 1) {
      return
    }
    if (this.todosUpdating || this.loading || this.noMoreTodos) {
      return
    }
    this.loadTodos(false, true)
  }

  toggleCalendar() {
    this.calendarViewEnabled = !this.calendarViewEnabled
    this.loadTodos(true, false)
  }

  requestBreakdown(todo: Todo) {
    console.warn(`Breakdown for ${todo.text}`)
  }

  get firstDayOfWeek() {
    const storeFirstDayOfWeek = this.$store.state.userState.settings
      .firstDayOfWeek
    return storeFirstDayOfWeek === undefined
      ? this.$store.state.language === 'en'
        ? 0
        : 1
      : storeFirstDayOfWeek
  }

  monthAndYearFromDate(date: Date) {
    return `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
  }

  moveDate(event: any, date: Date) {
    if (!this.editable) {
      return
    }
    const newTitle = moment(date).format('YYYY-MM-DD')
    if (isDateTooOld(newTitle, api.getToday())) {
      return
    }
    for (const section of this.todos) {
      for (const todo of section.todos) {
        if (todo._id === event.originalEvent.id) {
          if (newTitle !== section.title) {
            // Remove from old section
            section.todos = section.todos.filter((t) => t._id !== todo._id)
            // Add to new section
            let i = 0
            for (const section of this.todos) {
              if (section.title === newTitle) {
                section.todos.push(todo)
                Vue.set(this.todos, i, section)
                return
              }
              i++
            }
            this.todos.push({
              title: newTitle,
              todos: [todo],
            })
            return
          }
        }
      }
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
}
</script>

<style>
/*
  List view
*/

.handle {
  cursor: move;
}

/* 
  Calendar view
*/

/* Colors */

.light .cv-header,
.light .cv-header-day {
  background-color: #fff;
}

.dark .cv-header,
.dark .cv-header-day {
  background-color: #424242;
}

.light .cv-header button {
  color: rgba(0, 0, 0, 0.54);
  border-width: 0;
}
.dark .cv-header button {
  color: hsla(0, 0%, 100%, 0.6);
}

.light .cv-day.past {
  background-color: #fafafa;
}
.light .cv-day.outsideOfMonth {
  background-color: #f7f7f7;
}
.light .cv-day.today {
  background-color: #ffe;
}
.dark .cv-day.past {
  background-color: #636363;
}
.dark .cv-day.outsideOfMonth {
  background-color: #2b2b2b;
}
.dark .cv-day.today {
  background-color: #61553c;
}

.light .cv-event {
  border-color: #e0e0f0;
  background-color: #e7e7ff;
}

.dark .cv-event {
  background-color: #7d7d88;
}

.dark .cv-day.draghover {
  box-shadow: inset 0 0 0.2em 0.2em white;
}
.light .cv-day.draghover {
  box-shadow: inset 0 0 0.2em 0.2em rgb(190, 190, 190);
}

/* Funcionality */

.cv-week {
  min-height: 8rem !important;
}

.cv-day {
  display: flex;
}

.cv-header button {
  border-width: 0 !important;
}

.cv-event {
  border-radius: 0.5em;
  text-overflow: ellipsis;
  border-width: 0;
}

.non-editable .cv-event {
  cursor: pointer;
}

.editable .cv-event {
  cursor: move;
}

#confetti-canvas {
  z-index: 1000 !important;
}
</style>
