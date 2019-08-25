<template lang="pug">
  div
    v-text-field(clearable
    :label='$t("todo.create.text")'
    :hint='$t("todo.create.textHint")'
    :rules='textRules'
    v-model='todo.text')
    v-row
      v-col(cols='12' md='6')
        v-menu(v-model='dateMenu')
          template(v-slot:activator='{ on }')
            v-text-field(clearable
            readonly
            :label="$t('todo.create.date')"
            prepend-icon="event"
            v-on='on'
            v-model='todo.date'
            :disabled='!!todo.monthAndYear'
            :rules='dateAndMonthRules')
          v-date-picker(@input='dateMenu = false'
          v-model='todo.date'
          :min='yesterdayFormatted'
          :first-day-of-week='$store.state.language === "ru" ? 1 : 0')
      v-col(cols='12' md='6')
        v-menu(v-model='monthMenu')
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
          :min='new Date(new Date().setMonth(new Date().getMonth()+1)).toISOString()'
          type='month')
    v-row
      v-col(cols='12' md='6')
        v-switch(:label='$t("todo.create.frog")' v-model='todo.frog')
      v-col(cols='12' md='6')
        v-switch(:label='$t("todo.create.completed")' v-model='todo.completed')
    v-row
      slot
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Todo } from "../models/todo";
import { i18n } from "../plugins/i18n";
import moment from "moment";

@Component({
  props: {
    todo: Object
  }
})
export default class TodoForm extends Vue {
  dateMenu = false;
  monthMenu = false;

  textRules = [
    (v: any) => !!(v || "").trim() || i18n.t("errors.todo.textLenght")
  ];

  dateAndMonthRules = [
    (v: any) => {
      const todo = (this as any).todo as Partial<Todo>;
      return (
        !!todo.date || !!todo.monthAndYear || i18n.t("errors.todo.dateOrMonth")
      );
    }
  ];

  get yesterdayFormatted() {
    return moment(
      new Date(new Date().setDate(new Date().getDate() - 1))
    ).format();
  }
}
</script>