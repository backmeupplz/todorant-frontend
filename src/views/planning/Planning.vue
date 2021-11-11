<template lang="pug">
v-container(style='maxWidth: 1000px;', v-hotkey='completeTodoKeymap')
  v-list(subheader)
    v-list-item.pt-4.text-left(v-if='planning && !showCompleted')
      v-flex
        v-alert(text, color='info', icon='info') {{ $t("planningText") }}
    v-list-item.background-colored.d-flex.align-center.no-margin-no-padding(
      :style='stickyHeaderStyle',
      dense
    )
      v-switch.no-margin-no-padding(
        v-if='!calendarViewEnabled && !search && !searchTags.size',
        hide-details,
        v-model='showCompleted',
        :label='$t("todo.list.completed")',
        :loading='todosUpdating',
        :disabled='editable'
      )
      .d-flex.flex-column(v-if='search', style='width: 100%')
        v-text-field.pt-2.mr-4(
          :autofocus='true',
          v-model='queryString',
          :label='$t("search")',
          clearable,
          dense,
          ref='queryString'
        )
        .mb-4(v-if='filteredTags.length')
          v-btn(
            text,
            small,
            v-for='(tag, i) in filteredTags',
            :key='i',
            :color='colorForTag(tag)',
            @click='tagSelected(tag)'
          ) {{ "#" }}{{ tag.tag }}
      .search-container(v-if='!!searchTags.size')
        v-btn.mr-2(
          :loading='todosUpdating || loading',
          @click='goHome',
          small,
          icon
        )
          v-icon(small) clear
        v-chip.ma-1(v-for='(word, i) in searchTags', :key='i')
          span.search-word {{ word }}
          v-btn.ml-2(small, icon, @click='delHash(word)')
            v-icon(small) close
      v-spacer(v-if='!search')
      IconButton.planning-calendar-button(
        v-if='!editable && !showCompleted && !search && !spreadEnabled',
        name='$calendar',
        :click='toggleCalendar',
        :loading='todosUpdating || loading'
      )
      v-tooltip(
        bottom,
        :max-width='300',
        v-if='calendarViewEnabled && !editable && !spreadEnabled'
      )
        template(v-slot:activator='{ on }')
          v-btn(
            @click='spreadEnabled = true',
            icon,
            :loading='todosUpdating || loading'
          )
            v-icon(v-on='on', color='#3366FF') call_split
        span {{ $t("spread.hint") }}
      IconButton(
        name='$rearrange',
        v-if='!editable && !showCompleted && !spreadEnabled',
        :loading='todosUpdating',
        :click='() => (editable = true)'
      )
      v-btn(
        v-if='!!editable || !!spreadEnabled',
        icon,
        :loading='todosUpdating || loading',
        @click='crossPressed',
        v-hotkey='keymap'
      )
        v-icon clear
      v-btn(
        v-if='!!editable || !!spreadEnabled',
        icon,
        :loading='todosUpdating || loading',
        @click='donePressed',
        color='green'
      )
        v-icon done
      IconButton.planning-calendar-button(
        v-if='!editable && !showCompleted && !calendarViewEnabled',
        :loading='todosUpdating || loading',
        :click='searchTouched',
        name='$search',
        v-hotkey.forbidden='searchKeymap'
      )
      IconButton.planning-calendar-button(
        :loading='todosUpdating',
        :click='loadTodos',
        name='$refresh'
      )
    v-list-item(v-if='calendarViewEnabled && todosUpdating', flex)
      v-progress-linear(:indeterminate='true')
    // Content
    // Spread
    v-list-item.my-2(v-if='spreadEnabled')
      .d-flex.direction-row.align-center.flex-wrap
        span.mx-1 {{ $t("spread.spreading") }}
        v-chip.mx-1(v-if='!spreadTasks.length') {{ $t("spread.chooseTasks") }}
        v-chip.mx-1.my-1(v-else, v-for='task in spreadTasks', :key='task._id')
          span {{ text(task, true) }}
          v-btn.ml-2(small, icon, @click='removeSpreadTask(task)')
            v-icon(small) close
        span.mx-1 {{ $t("spread.between") }}
        v-chip.mx-1(v-if='!spreadDates.length') {{ $t("spread.chooseDates") }}
        v-chip.mx-1.my-1(v-else, v-for='(date, i) in spreadDates', :key='i')
          span {{ date }}
          v-btn.ml-2(small, icon, @click='removeSpreadDate(date)')
            v-icon(small) close
    v-list-item(v-if='calendarViewEnabled', flex, :class='calendarClass')
      calendar-view(
        :items='events',
        :locale='locale',
        :startingDayOfWeek='safeFirstDayOfWeek',
        :showDate='currentPeriod',
        :class='dark ? "dark" : "light"',
        :enableDragDrop='editable',
        @click-item='editEvent',
        @click-date='clickDate',
        @drop-on-date='moveDate',
        :weekStyles='weekStyles',
        :todayDate='todayDate'
      )
        calendar-view-header(
          v-if='!editable',
          slot='header',
          slot-scope='{ headerProps }',
          :header-props='headerProps',
          :previousYearLabel='"/img/calendar/previousYearLabel.svg"',
          :previousPeriodLabel='"/img/calendar/previousPeriodLabel.svg"',
          :nextPeriodLabel='"/img/calendar/nextPeriodLabel.svg"',
          :nextYearLabel='"/img/calendar/nextYearLabel.svg"',
          @input='(date) => (currentPeriod = date)'
        )
    v-expansion-panels(v-else, flat, multiple, v-model='panels')
      v-expansion-panel.no-margin-no-padding(
        v-for='(todoSection, i) in todos',
        :key='i'
      )
        v-expansion-panel-header.no-margin-no-padding(
          v-observe-visibility='(isVisible, entry) => headerVisibilityChanged(isVisible, entry, i)'
        )
          PlanningHeader(
            :todoSection='todoSection',
            :loading='loading',
            :getPanels='getPanels',
            :setPanels='setPanels',
            :panelIndex='i'
          )
        v-expansion-panel-content.no-margin-no-padding(translate='no')
          draggable(
            :forceFallback='shouldFallbackDraggable',
            v-model='todoSection.todos',
            group='todo',
            @start='drag = true',
            @end='drag = false',
            v-bind='dragOptions',
            handle='.handle'
          )
            v-list-item.pa-0(
              dense,
              v-for='(todo, j) in todoSection.todos',
              :key='j',
              v-observe-visibility='(isVisible, entry) => visibilityChanged(isVisible, entry, i, j)'
            )
              v-list-item-content
                TodoCard(
                  :type='showCompleted ? "done" : "planning"',
                  :deleteTodo='() => deleteTodo(todo)',
                  :addTodo='() => breakdownTodo(todo)',
                  :completeTodo='(hotkey) => completeOrUndoTodo(todo, hotkey)',
                  :repeat='() => completeOrUndoTodo(todo)',
                  :edit='() => editTodo(todo)',
                  :moveTodoToToday='() => moveTodoToToday(todo)',
                  :todo='todo',
                  :loading='loading',
                  :editable='editable'
                )
    v-progress-linear(
      v-if='todosUpdating && !calendarViewEnabled',
      :indeterminate='true'
    )
  EditTodo(
    :todo='todoEdited',
    :cleanTodo='cleanTodo',
    :requestDelete='requestDelete'
  )
  DeleteTodo(:todo='todoDeleted')
  BreakdownMessage(
    :dialog='breakdownMessageDialog',
    :complete='completeRepetitiveTodo',
    :breakdown='breakdownRepetitiveTodo',
    :close='closeRepetitiveTodo'
  )
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Todo } from '@/models/Todo'
import { getTodos, editTodo } from '@/utils/api'
import EditTodo from '@/views/EditTodo.vue'
import DeleteTodo from '@/components/DeleteTodo.vue'
import { Prop, Watch } from 'vue-property-decorator'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import draggable from 'vuedraggable'
import { TodoSection } from '@/models/TodoSection'
import { isDateTooOld } from '@/utils/isTodoOld'
import { CalendarView, CalendarViewHeader } from '@upacyxou/vue-simple-calendar'
import dayjs, { Dayjs } from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import debounce from 'lodash/debounce'
import { v4 as uuid } from 'uuid'
import { decrypt } from '@/utils/encryption'
import { i18n } from '@/plugins/i18n'
import { playSound, Sounds } from '@/utils/sounds'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import PlanningHeader from '@/views/planning/PlanningHeader.vue'
import TodoCard from '@/components/TodoCard/TodoCard.vue'
import IconButton from '@/icons/IconButton.vue'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import enLocale from 'dayjs/locale/en'
import { Tag } from '@/models/Tag'
import BreakdownMessage from '@/components/BreakdownMessage.vue'

dayjs.extend(localizedFormat)
dayjs.extend(weekOfYear)
dayjs.locale(enLocale)

const AppStore = namespace('AppStore')
const UserStore = namespace('UserStore')
const TagsStore = namespace('TagsStore')
const SnackbarStore = namespace('SnackbarStore')
const SettingsStore = namespace('SettingsStore')

@Component({
  components: {
    EditTodo,
    DeleteTodo,
    draggable,
    CalendarView,
    CalendarViewHeader,
    PlanningHeader,
    TodoCard,
    IconButton,
    BreakdownMessage,
  },
})
export default class TodoList extends Vue {
  @Prop({ required: true }) currentTab!: number

  @AppStore.State dark!: boolean
  @AppStore.State language!: string
  @AppStore.State editting!: boolean
  @AppStore.State todayDateTitle!: string
  @AppStore.Mutation setEditting!: (editting: boolean) => void
  @UserStore.State user!: User
  @UserStore.State planning!: boolean
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @SettingsStore.State firstDayOfWeek?: number
  @SettingsStore.State showMoreByDefault!: boolean
  @SettingsStore.State hotKeysEnabled!: boolean
  @TagsStore.State searchTags!: Set<String>
  @TagsStore.State tags!: Tag[]

  showCompleted = false
  todoEdited: Partial<Todo> | null = null
  todoDeleted: Todo | null = null
  todos = [] as TodoSection[]

  breakdownMessageDialog = false
  repetitiveTodo?: Todo

  collapsedPanels = {} as { [index: string]: boolean }
  getPanels() {
    return this.panels
  }
  get panels() {
    const result = [] as number[]
    this.todos.forEach((section, i) => {
      if (!this.collapsedPanels[section.title]) {
        result.push(i)
      }
    })
    return result
  }
  setPanels(panels: number[]) {
    this.panels = panels
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

  get calendarClass() {
    let classString = ''
    if (this.editable) {
      classString = `${classString} editable`
    } else {
      classString = `${classString} non-editable`
    }
    if (this.spreadEnabled) {
      classString = `${classString} spreadable`
    }
    return classString
  }

  get events() {
    let spreadEvents = [] as string[]
    if (this.spreadEnabled) {
      spreadEvents = this.spreadTasks.map((t) => t._id)
    }
    return this.todos
      .map((section) => {
        return section.todos
          .filter((todo) => !!todo.date)
          .filter(
            (todo) => !this.spreadEnabled || !spreadEvents.includes(todo._id)
          )
          .map((todo) => ({
            id: todo._id,
            title: this.text(todo),
            startDate: section.title,
            order: todo.order,
          }))
      })
      .reduce((p, c) => p.concat(c), [])
  }

  get numberOfEventsPerWeek() {
    const weeksMap = this.events.reduce((prev, cur) => {
      const week = this.weekForDate(dayjs(cur.startDate))
      if (prev[week]) {
        prev[week][cur.startDate] = (prev[week][cur.startDate] || 0) + 1
      } else {
        prev[week] = {}
        prev[week][cur.startDate] = 1
      }
      return prev
    }, {} as { [index: number]: { [index: string]: number } })
    const result = {} as { [index: number]: number }
    for (const key in weeksMap) {
      const weeks = weeksMap[key]
      result[key] = Object.keys(weeks).reduce((p, c) => {
        return weeks[c] > p ? weeks[c] : p
      }, 0)
    }

    return result
  }

  get shouldFallbackDraggable() {
    return navigator.userAgent.toLowerCase().indexOf('safari') > -1
  }

  get todayDate() {
    return new Date(this.todayDateTitle)
  }

  get searchKeymap() {
    return {
      'ctrl+shift+f': () => {
        if (!this.hotKeysEnabled) return
        this.debouncedSearch()
      },
    }
  }

  get keymap() {
    return {
      esc: this.crossPressed,
    }
  }

  get completeTodoKeymap() {
    return {
      d: () => {
        if (this.currentTab)
          this.completeOrUndoTodo(this.todos[0].todos[0], true)
      },
      b: () => {
        if (this.currentTab) this.breakdownTodo(this.todos[0].todos[0], true)
      },
    }
  }

  noMoreTodos = false

  loading = false
  drag = false

  search = false
  queryString = ''

  debouncedLoadTodos = debounce(() => {
    this.loadTodos()
  }, 1500)

  @Watch('queryString')
  onQuerryStringChanged() {
    this.todosUpdating = true
    this.debouncedLoadTodos()
  }

  calendarViewEnabled = false

  currentPeriod = new Date()

  get filteredTags() {
    const emptyMatches = this.queryString.match(/#$/g) || []
    if (emptyMatches.length) {
      return this.tags
    }
    const matches =
      this.queryString.match(/#[\u0400-\u04FFa-zA-Z_0-9]+$/g) || []
    if (!matches.length) {
      return this.showMoreByDefault ? this.tags : []
    }
    const match = matches[0]
    return this.tags
      .filter((tag) => tag.tag.includes(match.substr(1)))
      .filter((tag) => tag.tag !== match.substr(1))
  }

  colorForTag(tag: Tag) {
    return tag.color || (this.dark ? '#64B5F6' : '#1E88E5')
  }

  get stickyHeaderStyle() {
    return {
      position: 'sticky',
      top: this.$vuetify.breakpoint.smAndDown ? 53 : 60,
      zIndex: 2,
      backgroundColor: this.dark ? '#1e1e1e' : '#ffffff',
    }
  }

  @Watch('currentPeriod')
  onCurrentPeriodChanged(val: boolean, oldVal: boolean) {
    this.todos = []
    this.loadTodos()
  }

  get locale() {
    return this.language === 'ua' ? 'uk' : this.language
  }

  get editable() {
    return this.editting
  }
  set editable(value: boolean) {
    this.setEditting(value)
    if (value === false) {
      this.loadTodos()
    }
  }
  get weekdays() {
    const storeFirstDayOfWeek = this.firstDayOfWeek
    const firstDay =
      storeFirstDayOfWeek === undefined
        ? this.language === 'ru'
          ? 1
          : 0
        : storeFirstDayOfWeek
    const result = [firstDay]
    for (let i = 1; i < 7; i++) {
      result.push((firstDay + i) % 7)
    }
    return result
  }

  get weekStyles() {
    return [0, 1, 2, 3, 4, 5].map((v) => ({
      'min-height': this.heightForWeek(v),
    }))
  }

  setRepetitiveTodo(todo: Todo) {
    this.repetitiveTodo = todo
  }

  heightForWeek(i: number) {
    const thisMonth = dayjs(this.currentPeriod).startOf('month')
    const currentWeek = this.weekForDate(thisMonth)
    const numberOfEvents = this.numberOfEventsPerWeek[currentWeek + i] || 1
    const height = 18
    const gap = 2
    const padding = 1.615
    const totalHeight = height + gap + padding
    const margin = 32
    return `calc(${numberOfEvents * totalHeight}px + ${margin}px)`
  }

  @Watch('showCompleted')
  onCompletedChanged(val: boolean, oldVal: boolean) {
    if (val === oldVal) return
    this.loadTodos()
  }

  mounted() {
    this.loadTodos()
  }

  tagSelected(tag: Tag) {
    const queryString = (this.$refs.queryString as any).$refs.input
    const text = this.queryString
    const len = text.length
    let pos = queryString.selectionStart
    if (pos === undefined) {
      pos = 0
    }
    const before = text.substr(0, pos)
    const after = text.substr(pos, len)
    const insertText =
      before.length && before[before.length - 1] !== ' '
        ? ` #${tag.tag}`
        : `#${tag.tag}`
    const endPos = pos + insertText.length
    const bodyQueryString = (this.$refs.queryString as any).$el.querySelector(
      'textarea'
    )

    const emptyMatches = this.queryString.match(/#$/g) || []
    if (emptyMatches.length) {
      this.queryString = `${before}${tag.tag}${after}`
      ;(this.$refs.queryString as any).focus()
      setTimeout(() => bodyQueryString.setSelectionRange(endPos, endPos))
      return
    }
    const matches =
      this.queryString.match(/#[\u0400-\u04FFa-zA-Z_0-9]+(?!\s)$/g) || []
    if (!matches.length) {
      this.queryString = `${before}${insertText}${after}`
      ;(this.$refs.queryString as any).focus()
      setTimeout(() => bodyQueryString.setSelectionRange(endPos, endPos))
      return
    }
    const match = matches[0]
    this.queryString = `${before.substr(
      0,
      before.length - match.length
    )}${insertText}${after}`
    ;(this.$refs.queryString as any).focus()
    setTimeout(() => bodyQueryString.setSelectionRange(endPos, endPos))
  }

  created() {
    serverBus.$on('refreshRequested', () => {
      this.loadTodos()
    })
    serverBus.$on('cleanHash', () => {
      this.searchTags.clear()
    })

    window.onhashchange = () => {
      const hashArr = decodeURI(this.$router.currentRoute.hash).split(',')
      this.searchTags.add(hashArr[hashArr.length - 1])
    }
  }

  async delHash(word: string) {
    this.searchTags.delete(word)
    const hashesString = [...this.searchTags.values()].join(',')
    await this.$router.replace(this.user ? `/superpower${hashesString}` : '/')
    serverBus.$emit('refreshRequested')
  }

  todosUpdating = false
  loadingUUID = ''
  async loadTodos(fullUpdate = true, more = false) {
    const currentLoadingUUID = uuid()
    this.loadingUUID = currentLoadingUUID
    const user = this.user
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
        this.queryString.trim(),
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
      const mappedTodos = allTodos.reduce((prev, cur) => {
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
      }, {} as { [index: string]: Todo[] })
      if (this.loadingUUID !== currentLoadingUUID) {
        return
      }
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
      // Don's show request abort
      if (err.message.includes('aborted')) {
        return
      }
      this.setSnackbarError('errors.loadTodos')
      this.queryString = ''
    } finally {
      if (this.loadingUUID === currentLoadingUUID) {
        this.todosUpdating = false
      }
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
      if (todo._id === event.id) {
        if (this.spreadEnabled) {
          if (!this.spreadTasks.map((t) => t._id).includes(todo._id)) {
            this.spreadTasks.push(todo)
          }
        } else {
          this.editTodo(todo)
        }
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
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      const today = api.getStringFromDate(this.todayDate)
      const monthAndYear = today.substr(0, 7)
      const date = today.substr(8)
      todo.monthAndYear = monthAndYear
      todo.date = date
      await api.editTodo(user, todo)
      this.loadTodos(false)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
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

  async completeOrUndoTodo(todo: Todo, hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) return
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      if (todo.completed) {
        await api.undoTodo(user, todo)
      } else {
        if (todo.repetitive) {
          this.setRepetitiveTodo(todo)
          this.breakdownMessageDialog = true
        } else {
          this.completeTodo(user, todo)
        }
      }
      this.loadTodos(false)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
    } finally {
      this.loading = false
    }
  }

  async completeTodo(user: User, todo: Todo) {
    const { incompleteFrogsExist } = await api.completeTodo(user, todo)
    if (todo.frog) {
      await playSound(Sounds.levelUp)
    } else {
      if (incompleteFrogsExist) {
        serverBus.$emit('violationFrogRules')
      }
      await playSound(Sounds.taskDone)
    }
    this.tryConfetti()
  }

  cleanTodo(needsReload = true) {
    this.todoEdited = null
    if (needsReload) {
      this.loadTodos(false)
    }
  }

  get dragOptions() {
    return {
      animation: 0,
      disabled: !this.editable,
    }
  }

  async doneEditing() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      await api.rearrangeTodos(user, this.todos)
      await this.loadTodos(false)
    } catch (err) {
      this.setSnackbarError(err.response ? err.response.data : err.message)
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

  get safeFirstDayOfWeek() {
    const storeFirstDayOfWeek = this.firstDayOfWeek
    return storeFirstDayOfWeek === undefined
      ? this.language === 'en'
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
    const newTitle = dayjs(date).locale(enLocale).format('YYYY-MM-DD')
    if (isDateTooOld(newTitle, api.getToday())) {
      return
    }
    for (const section of this.todos) {
      for (const todo of section.todos) {
        if (todo._id === event.id) {
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

  breakdownTodo(todo: Todo, hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) return
    serverBus.$emit('addTodoRequested', undefined, todo)
  }

  searchTouched() {
    this.search = !this.search
    this.queryString = ''
  }

  debouncedSearch = debounce(this.searchTouched)

  async goHome() {
    try {
      this.searchTags.clear()
      await this.$router.replace(this.user ? '/superpower' : '/')
      serverBus.$emit('refreshRequested')
    } catch (err) {
      // Do nothing
    }
  }

  text(todo: Todo, short = false) {
    let text = ''
    if (todo.encrypted) {
      text =
        decrypt(todo.text, true) ||
        (i18n.t('encryption.errorDecrypting') as string)
    } else {
      text = todo.text
    }
    if (short && text && text.length > 15) {
      text = `${text.substr(0, 15)}...`
    }
    return text
  }

  weekForDate(date: Dayjs) {
    const week = date
      .locale(dayjs.locale(), {
        weekStart: this.safeFirstDayOfWeek,
      })
      .week()
    return week
  }

  spreadEnabled = false
  spreadTasks = [] as Todo[]
  spreadDates = [] as string[]

  crossPressed() {
    if (this.editable) {
      this.editable = false
    } else {
      this.spreadEnabled = false
      this.spreadTasks = []
      this.spreadDates = []
    }
  }

  async donePressed() {
    if (this.editable) {
      this.doneEditing()
    } else {
      const user = this.user
      if (!user) {
        return
      }
      this.loading = true

      const spreadTodos = {} as { [index: string]: Todo[] }
      for (const title of this.spreadDates) {
        spreadTodos[title] = []
      }
      let i = 0
      for (const todo of this.spreadTasks) {
        spreadTodos[this.spreadDates[i]].push(todo)

        i++
        if (i >= this.spreadDates.length) {
          i = 0
        }
      }

      const allMovedTodosIds = this.spreadTasks.map((t) => t._id)

      try {
        for (const section of this.todos) {
          // Remove moved todos
          section.todos = section.todos.filter(
            (t) => !allMovedTodosIds.includes(t._id)
          )
          // Re-add mobed todos
          if (spreadTodos[section.title]) {
            section.todos = section.todos.concat(spreadTodos[section.title])
          }
        }
        // Account for the unexisting todo sections
        const titles = this.todos.map((s) => s.title)
        for (const title in spreadTodos) {
          if (!titles.includes(title)) {
            this.todos.push({
              title,
              todos: spreadTodos[title],
            })
          }
        }
        // Save
        await api.rearrangeTodos(user, this.todos)
        await this.loadTodos(false)
      } catch (err) {
        this.setSnackbarError(err.response ? err.response.data : err.message)
      } finally {
        this.loading = false
        this.spreadEnabled = false
        this.spreadTasks = []
        this.spreadDates = []
      }
    }
  }

  removeSpreadTask(task: Todo) {
    this.spreadTasks = this.spreadTasks.filter((t) => t._id !== task._id)
  }

  removeSpreadDate(date: string) {
    this.spreadDates = this.spreadDates.filter((d) => d !== date)
  }

  clickDate(day: Date) {
    if (!this.spreadDates) {
      return
    }
    const today = api.getToday()
    const dateString = api.getStringFromDate(day)
    if (isDateTooOld(dateString, today)) {
      return
    }
    if (!this.spreadDates.includes(dateString)) {
      this.spreadDates.push(dateString)
    }
  }

  completeRepetitiveTodo(hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) return
    if (!this.repetitiveTodo) return
    this.completeTodo(this.user, this.repetitiveTodo)
    this.breakdownMessageDialog = false
  }

  breakdownRepetitiveTodo(hotkey = false) {
    if (hotkey && !this.hotKeysEnabled) return
    serverBus.$emit('addTodoRequested', undefined, this.repetitiveTodo)
    this.breakdownMessageDialog = false
  }

  closeRepetitiveTodo() {
    this.breakdownMessageDialog = false
  }
}
</script>

<style>
@media only screen and (max-width: 1040px) {
  .search-container {
    max-width: 50%;
  }
}

@media only screen and (min-width: 1040px) {
  .search-container {
    max-width: 75%;
  }
}

.cv-header-nav {
  display: flex;
  justify-content: center;
}

.previousYear {
  cursor: pointer;
  margin-right: 6px;
  margin-left: 6px;
}
.previousPeriod {
  cursor: pointer;
  margin-right: 6px;
  margin-left: 6px;
}
.nextYear {
  cursor: pointer;
  margin-right: 6px;
  margin-left: 6px;
}
.nextPeriod {
  cursor: pointer;
  margin-right: 6px;
  margin-left: 6px;
}

.light div[class^='cv-day'][class*='past'] {
  background-color: rgba(51, 102, 255, 0.06) !important;
}

.dark div[class^='cv-day'][class*='past'] {
  background-color: #1b1b1c !important;
}

.cv-header {
  border: none !important;
  border-style: none !important;
}

.cv-header-days {
  border: none !important;
  border-style: none !important;
}

.cv-weeks {
  border: none !important;
  border-style: none !important;
}

.currentPeriod {
  border: none !important;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px !important;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.24px;
  text-transform: capitalize;
}

.light .currentPeriod {
  color: #000000;
  opacity: 0.9;
}

.dark .currentPeriod {
  color: #ffffff;
  opacity: 0.9;
}

.cv-day {
  border: none;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 16px !important;
  line-height: 20px !important;
  letter-spacing: -0.24px !important;
}

.dark .cv-day {
  color: #ffffff;
  opacity: 0.6;
  border: 1px solid #202021;
}

.light .cv-day {
  color: #000000;
  opacity: 0.6;
  border: 1px solid #dde2e5;
}

.cv-header-nav {
  position: absolute;
  left: 34%;
  z-index: 10;
}

.nextPeriod {
  border: none !important;
  color: #b6babf;
}

.previousPeriod {
  border: none !important;
  color: #b6babf;
}

.previousYear {
  border: none !important;
  color: #b6babf;
}

.nextYear {
  border: none !important;
  color: #b6babf;
}

.periodLabel {
  text-transform: capitalize;
  font-family: Montserrat !important;
  font-style: normal;
  font-weight: 500;
  font-size: 18px !important;
  line-height: 20px;
  letter-spacing: -0.24px;
}

.dark .periodLabel {
  color: #ffffff;

  opacity: 0.4;
}

.light .periodLabel {
  color: #000000;
  opacity: 0.7;
}

.light .outsideOfMonth {
  background-color: rgba(255, 95, 19, 0.08);
  color: rgba(0, 0, 0, 0.2);
}

.dark .outsideOfMonth {
  background-color: rgba(27, 27, 28, 1);
}

div[class^='cv-wrapper'][class$='light'] {
  border: 1px solid #dde2e5;
  border-radius: 12px;
}

div[class^='cv-wrapper'][class$='dark'] {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
}

.cv-header-day {
  padding: 20px !important;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px !important;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.24px;
  text-transform: uppercase;
}

.dark .cv-header-day {
  border: 1px solid #202021;
}

.light .cv-header-day {
  color: #000000;
  opacity: 0.4;
}

.dark .cv-header-day {
  color: #ffffff;
  opacity: 0.4;
}

.cv-day-number {
  margin-top: 8px;
  margin-left: 8px;
}

.today {
  font-weight: 600;
  opacity: 1 !important;
}

.dark .today {
  color: #ffffff !important;
  background-color: rgba(255, 95, 19, 0.1);
}

.light .today {
  color: #3366ff !important;
}

.cv-item {
  border-radius: 4px;
  border: none !important;
  border-style: none !important;
  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 20px;
  /* identical to box height, or 143% */
  letter-spacing: -0.24px;
  margin-top: 4px;
  padding: 2px;
  color: #ffffff;
  margin-top: 16px;
}

.light .cv-item {
  background-color: #3366ff;
}

.dark .cv-item {
  background-color: #2a53ce;
}

.no-margin-no-padding,
.v-expansion-panel-content__wrap {
  margin: 0px !important;
  padding: 0px !important;
}

.handle {
  cursor: move;
}
#confetti-canvas {
  z-index: 1000 !important;
}
.non-editable .cv-item {
  cursor: pointer;
}

.editable .cv-item {
  cursor: move;
}

.spreadable .cv-day {
  cursor: pointer;
}

.dark .cv-day.draghover {
  box-shadow: inset 0 0 0.2em 0.2em white;
}
.light .cv-day.draghover {
  box-shadow: inset 0 0 0.2em 0.2em rgb(190, 190, 190);
}

.search-word {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
