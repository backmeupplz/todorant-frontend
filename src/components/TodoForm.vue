<template lang="pug">
  div
    v-textarea(clearable
    :label='$t("todo.create.text")'
    :hint='$t("todo.create.textHint")'
    :rules='textRules'
    v-model='todo.text'
    autofocus
    v-on:keyup.enter="enterUp"
    v-on:keyup.shift.native="shiftUp"
    v-on:keydown.enter="enterDown"
    v-on:keydown.shift="shiftDown"
    v-on:keyup.esc="escape"
    ref='textInput'
    auto-grow
    no-resize
    rows='1'
    @focus='focused = true'
    @blur='focused = false').pb-2
    .mb-4(v-if='tags.length')
      v-btn(text
      small
      v-for='(tag, i) in tags'
      :key='i'
      :color='colorForTag(tag)'
      @click='tagSelected(tag)') {{'#'}}{{tag.tag}}
    v-row(no-gutters)
      v-col(cols='12' md='6')
        v-menu(v-model='dateMenu' min-width=0)
          template(v-slot:activator='{ on }')
            v-text-field(clearable
            readonly
            :label="$t('todo.create.date')"
            prepend-icon="event"
            v-on='on'
            v-model='todo.date'
            :disabled='!!todo.monthAndYear'
            :rules='dateAndMonthRules'
            ref='dateInput')
          v-date-picker(@input='dateMenu = false'
          v-model='todo.date'
          :min='todayFormattedForExactDate'
          :first-day-of-week='firstDayOfWeek'
          :locale='$store.state.language'
          :show-current='todayFormatted')
      v-col(cols='12' md='6')
        v-menu(v-model='monthMenu'  min-width=0)
          template(v-slot:activator='{ on }')
            v-text-field(clearable
            readonly
            :label="$t('todo.create.month')"
            prepend-icon="event"
            v-on='on'
            v-model='todo.monthAndYear'
            :disabled='!!todo.date'
            :rules='dateAndMonthRules')
          v-date-picker(@input='monthMenu = false'
          v-model='todo.monthAndYear'
          :min='todayFormattedForDatePicker'
          type='month'
          :locale='$store.state.language')
      v-col(v-if='moreShown' cols='12' md='6')
        v-menu(v-model='timeMenu' :close-on-content-click='false'  min-width=0)
          template(v-slot:activator='{ on }')
            v-text-field(clearable
            readonly
            :label="$t('todo.create.time')"
            prepend-icon="access_time"
            v-on='on'
            v-model='todo.time')
          v-card
            v-card-text
              v-time-picker.elevation-0(v-model='todoTime' format='24hr' :close-on-content-click="false")
            v-card-actions
              v-spacer
              v-btn(text color='blue' @click='timeMenu = false') Close
    v-row(no-gutters)
      v-col(cols='12' md='6')
        v-switch(:label='$t("todo.create.frog")' v-model='todo.frog')
      v-col(cols='12' md='6')
        v-switch(:label='$t("todo.create.completed")' v-model='todo.completed')
      v-col(v-if='!hideAddToTheTop && moreShown' cols='12' md='6')
        v-switch(:label='$t("todo.create.goFirst")' v-model='todo.goFirst')
    v-row.v-flex-row
      v-btn(v-if='!moreShown' icon text color='default' @click='moreShown = !moreShown')
        v-icon more_horiz
      slot
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Todo } from '../models/todo'
import { i18n } from '../plugins/i18n'
import moment from 'moment'
import * as store from '../plugins/store'
import { Tag } from '../models/tag'

@Component({
  props: {
    todo: Object,
    enterPressed: Function,
    escapePressed: Function,
    hideAddToTheTop: Boolean,
  },
})
export default class TodoForm extends Vue {
  dateMenu = false
  monthMenu = false
  timeMenu = false
  moreShown = false

  focused = false

  get todoTime() {
    return this.$props.todo.time
  }
  set todoTime(newValue: any) {
    this.$props.todo.time = newValue
    console.log(this.$props.todo)
    if (!this.$props.todo.date && !this.$props.todo.monthAndYear) {
      this.$props.todo.date = new Date().toISOString().substr(0, 10)
    }
  }

  get tags() {
    if (!this.focused) {
      return []
    }
    const emptyMatches = this.$props.todo.text.match(/#$/g) || []
    if (emptyMatches.length) {
      return store.tags()
    }
    const matches =
      this.$props.todo.text.match(/#[\u0400-\u04FFa-zA-Z_0-9]+$/g) || []
    if (!matches.length) {
      return []
    }
    const match = matches[0]
    return store.tags().filter((tag) => tag.tag.includes(match.substr(1)))
  }

  textRules = [
    (v: any) => !!(v || '').trim() || i18n.t('errors.todo.textLenght'),
  ]

  dateAndMonthRules = [
    (v: any) => {
      const todo = (this as any).todo as Partial<Todo>
      return (
        !!todo.date || !!todo.monthAndYear || i18n.t('errors.todo.dateOrMonth')
      )
    },
  ]

  get firstDayOfWeek() {
    const storeFirstDayOfWeek = this.$store.state.userState.settings
      .firstDayOfWeek
    return storeFirstDayOfWeek === undefined
      ? this.$store.state.language === 'ru'
        ? 1
        : 0
      : storeFirstDayOfWeek
  }

  get todayFormatted() {
    return moment(new Date()).format('YYYY-MM-DD')
  }

  get todayFormattedForExactDate() {
    return moment(new Date(new Date().setDate(new Date().getDate()))).format()
  }

  get todayFormattedForDatePicker() {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    return moment(date).format()
  }

  shiftOn = false
  enterOn = false

  enterUp() {
    this.enterOn = false
  }
  enterDown() {
    this.enterOn = true
    this.checkEnter()
  }

  shiftUp() {
    this.shiftOn = false
  }

  shiftDown() {
    this.shiftOn = true
  }

  checkEnter() {
    if (this.shiftOn && this.enterOn) {
      ;(this as any).enterPressed()
    }
  }

  escape() {
    ;(this as any).escapePressed()
  }

  colorForTag(tag: Tag) {
    return tag.color || (store.dark() ? '#64B5F6' : '#1E88E5')
  }

  tagSelected(tag: Tag) {
    const emptyMatches = this.$props.todo.text.match(/#$/g) || []
    if (emptyMatches.length) {
      this.$props.todo.text = `${this.$props.todo.text}${tag.tag} `
      ;(this.$refs.textInput as any).focus()
      return
    }
    const matches =
      this.$props.todo.text.match(/#[\u0400-\u04FFa-zA-Z_0-9]+$/g) || []
    if (!matches.length) {
      return
    }
    const match = matches[0]
    this.$props.todo.text = `${this.$props.todo.text.substr(
      0,
      this.$props.todo.text.length - match.length
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
