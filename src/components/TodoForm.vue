<template lang="pug">
.px-4
  v-textarea(
    clearable,
    :label='$t("todo.create.text")',
    :hint='$t("todo.create.textHint")',
    :rules='textRules',
    v-model='text',
    v-on:keydown='keyDown',
    v-on:keyup.esc='escape',
    ref='textInput',
    auto-grow,
    no-resize,
    rows='1',
    :class='filteredTags.length ? "pb-2" : "pb-4"',
    :disabled='todo && todo.encrypted && (errorDecrypting(todo) || !$store.state.UserStore.password)',
    :autofocus='shouldAutofocus'
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
  v-row(no-gutters)
    v-col(cols='12', md='6')
      v-menu(v-model='dateMenu', :close-on-content-click='false', min-width=0)
        template(v-slot:activator='{ on }')
          v-text-field(
            clearable,
            readonly,
            :label='$t("todo.create.date")',
            prepend-icon='event',
            v-on='on',
            v-model='todo.date',
            :rules='dateAndMonthRules'
          )
        v-date-picker(
          @input='dateMenu = false',
          v-model='date',
          :min='todayFormattedForExactDate',
          :first-day-of-week='safeFirstDayOfWeek',
          :locale='locale',
          :show-current='todayFormatted'
        )
    v-col(cols='12', md='6')
      v-menu(v-model='monthMenu', :close-on-content-click='false', min-width=0)
        template(v-slot:activator='{ on }')
          v-text-field(
            clearable,
            readonly,
            :label='$t("todo.create.month")',
            prepend-icon='event',
            v-on='on',
            v-model='todo.monthAndYear',
            :rules='dateAndMonthRules'
          )
        v-date-picker(
          @input='monthMenu = false',
          v-model='monthAndYear',
          :min='todayFormattedForDatePicker',
          type='month',
          :locale='locale'
        )
    v-col(
      v-if='showMoreByDefault || moreShown || todo.time',
      cols='12',
      md='6'
    )
      v-menu(v-model='timeMenu', :close-on-content-click='false', min-width=0)
        template(v-slot:activator='{ on }')
          v-text-field(
            clearable,
            readonly,
            :label='$t("addTodoTime")',
            prepend-icon='access_time',
            v-on='on',
            v-model='todo.time'
          )
        v-card
          v-card-text
            v-time-picker.elevation-0(
              v-model='todoTime',
              format='24hr',
              :close-on-content-click='false'
            )
          v-card-actions
            v-spacer
            v-btn(text, color='blue', @click='timeMenu = false') Close
  v-row(no-gutters)
    v-col(cols='12', md='6')
      v-switch(:label='$t("todo.create.frog")', v-model='todo.frog')
    v-col(cols='12', md='6')
      v-switch(:label='$t("completed")', v-model='todo.completed')
    v-col(
      v-if='!editTodo && (showMoreByDefault || moreShown || todo.time)',
      cols='12',
      md='6'
    )
      v-switch(:label='$t("todo.create.goFirst")', v-model='todo.goFirst')
    v-col(
      v-if='!editTodo && delegates.length && (showMoreByDefault || moreShown || todo.time)',
      cols='12',
      md='6'
    )
      v-select(
        :items='delegatesItems',
        clearable,
        v-model='todo.delegate',
        :label='$t("delegate.pickDelegateField")'
      )
  v-row.v-flex-row
    v-btn(
      v-if='!showMoreByDefault && !moreShown && !todo.time',
      icon,
      text,
      color='default',
      @click='moreShown = !moreShown'
    )
      v-icon more_horiz
    slot
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Todo } from '@/models/Todo'
import { i18n } from '@/plugins/i18n'
import dayjs from 'dayjs'
import { Tag } from '@/models/Tag'
import { decrypt, encrypt } from '@/utils/encryption'
import { Watch, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'

import localizedFormat from 'dayjs/plugin/localizedFormat'
import enLocale from 'dayjs/locale/en'
import { serverBus } from '@/main'
import { db } from '@/utils/db'

dayjs.extend(localizedFormat)

const AppStore = namespace('AppStore')
const TagsStore = namespace('TagsStore')
const SettingsStore = namespace('SettingsStore')
const DelegationStore = namespace('DelegationStore')

@Component
export default class TodoForm extends Vue {
  @Prop({ required: true }) todo!: Todo
  @Prop({ required: true }) enterPressed!: () => void
  @Prop({ required: true }) escapePressed!: () => void
  @Prop() addTodo?: () => void
  @Prop({ default: false }) editTodo!: boolean
  @Prop({ default: true }) shouldAutofocus!: boolean

  @AppStore.State language?: string
  @AppStore.State dark!: boolean
  @SettingsStore.State showMoreByDefault!: boolean
  @SettingsStore.State newLineOnReturn!: boolean
  @SettingsStore.State firstDayOfWeek?: number
  @SettingsStore.State startTimeOfDay?: string
  @DelegationStore.State delegates!: User[]

  dateMenu = false
  monthMenu = false
  timeMenu = false
  moreShown = false

  tags: Tag[] = []

  async updateTags() {
    this.tags = await db.tags.filter((tag) => !tag.deleted).toArray()
  }

  created() {
    dayjs.locale(enLocale)
    serverBus.$on('updateTags', () => {
      this.updateTags()
    })
    this.updateTags()
  }

  get locale() {
    return this.language === 'ua' ? 'uk' : this.language
  }

  get todoTime() {
    return this.todo.time
  }
  set todoTime(newValue: any) {
    this.todo.time = newValue
    if (!this.todo.date && !this.todo.monthAndYear) {
      this.todo.date = new Date()
        .toISOString()
        .substr(0, 10)
    }
  }

  get text() {
    if (this.todo.encrypted) {
      return (
        decrypt(this.todo.text, true) ||
        (i18n.t('encryption.errorDecrypting') as string)
      )
    } else {
      return this.todo.text
    }
  }
  set text(newText: string) {
    if (this.todo.encrypted) {
      this.todo.text = encrypt(newText)
    } else {
      this.todo.text = newText
    }
  }

  get date() {
    return this.todo.date
  }
  set date(newDate: any) {
    // Have to use this hack here because in this case we want monthAndYear to be empty
    ;(this.todo as any).monthAndYear = undefined
    this.todo.date = newDate
  }

  get monthAndYear() {
    return this.todo.monthAndYear
  }
  set monthAndYear(newMonthAndYear: any) {
    // Have to use this hack here because in this case we want date to be empty
    ;(this.todo as any).date = undefined
    this.todo.monthAndYear = newMonthAndYear
  }

  get delegatesItems() {
    return this.delegates.map((d) => ({
      value: d._id,
      text: d.name,
    }))
  }

  errorDecrypting(todo: Todo) {
    if (todo.encrypted) {
      return !decrypt(todo.text, true)
    } else {
      return false
    }
  }

  get filteredTags() {
    const emptyMatches = this.todo.text.match(/#$/g) || []
    if (emptyMatches.length) {
      return this.tags
    }
    const matches = this.todo.text.match(/#[\u0400-\u04FFa-zA-Z_0-9]+$/g) || []
    if (!matches.length) {
      return []
    }
    const match = matches[0]
    return this.tags
      .filter((tag) => tag.tag.includes(match.substr(1)))
      .filter((tag) => tag.tag !== match.substr(1))
  }

  textRules = [
    (v: any) => !!(v || '').trim() || i18n.t('errors.todo.textLenght'),
    (v: any) => v.length <= 1500 || i18n.t('errors.todo.more1500'),
  ]

  dateAndMonthRules = [
    (v: any) => {
      const todo = (this as any).todo as Partial<Todo>
      return (
        !!todo.date ||
        !!todo.monthAndYear ||
        !!todo.delegate ||
        i18n.t('errors.todo.dateOrMonth')
      )
    },
  ]

  get safeFirstDayOfWeek() {
    const storeFirstDayOfWeek = this.firstDayOfWeek
    return storeFirstDayOfWeek === undefined
      ? this.language === 'en'
        ? 0
        : 1
      : storeFirstDayOfWeek
  }

  get todayFormatted() {
    return dayjs(new Date()).format('YYYY-MM-DD')
  }

  get todayFormattedForExactDate() {
    const storeStartTimeOfDay = this.startTimeOfDay || '00:00'
    const date = new Date()
    const newDay = new Date()
    newDay.setHours(parseInt(storeStartTimeOfDay.substr(0, 2)))
    newDay.setMinutes(parseInt(storeStartTimeOfDay.substr(3)))
    if (date < newDay) {
      return dayjs(
        new Date(new Date().setDate(new Date().getDate() - 1))
      ).format()
    }
    return dayjs(new Date(new Date().setDate(new Date().getDate()))).format()
  }

  get todayFormattedForDatePicker() {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    return dayjs(date).format()
  }

  keyDown(evt: any) {
    if (!evt.keyCode) {
      return
    }
    if (this.newLineOnReturn) {
      if (evt.keyCode === 13 && evt.ctrlKey) {
        if (evt.type === 'keydown') {
          ;(this as any).enterPressed()
        }
        evt.preventDefault()
      }
      if (evt.keyCode === 13) {
        return
      }
    }
    if (evt.keyCode === 65 && evt.ctrlKey && evt.shiftKey) {
      if (evt.type === 'keydown' && this.addTodo) {
        this.addTodo()
      }
      evt.preventDefault()
    }
    if (evt.keyCode === 13 && !evt.shiftKey) {
      if (evt.type === 'keydown') {
        ;(this as any).enterPressed()
      }
      evt.preventDefault()
    }
  }

  escape() {
    ;(this as any).escapePressed()
  }

  colorForTag(tag: Tag) {
    return tag.color || (this.dark ? '#64B5F6' : '#1E88E5')
  }

  tagSelected(tag: Tag) {
    const emptyMatches = this.todo.text.match(/#$/g) || []
    if (emptyMatches.length) {
      this.todo.text = `${this.todo.text}${tag.tag} `
      ;(this.$refs.textInput as any).focus()
      return
    }
    const matches = this.todo.text.match(/#[\u0400-\u04FFa-zA-Z_0-9]+$/g) || []
    if (!matches.length) {
      return
    }
    const match = matches[0]
    this.todo.text = `${this.todo.text.substr(
      0,
      this.todo.text.length - match.length
    )}#${tag.tag} `
    ;(this.$refs.textInput as any).focus()
  }
}
</script>

<style>
.v-input {
  padding: 0;
  margin: 0;
}
</style>
