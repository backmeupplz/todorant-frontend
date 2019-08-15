<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header
      span {{todo.text || $t('todo.create.placeholder')}}
    v-expansion-panel-content
      v-text-field(clearable
      :label="$t('todo.create.text')"
      :hint="$t('todo.create.textHint')"
      v-model='todo.text')
      v-row
        v-col(cols='6')
          v-menu(v-model='dateMenu')
            template(v-slot:activator='{ on }')
              v-text-field(clearable
              readonly
              :label="$t('todo.create.date')"
              prepend-icon="event"
              v-on='on'
              v-model='todo.date')
            v-date-picker(@input='dateMenu = false'
            v-model='todo.date'
            :min='new Date(new Date().setDate(new Date().getDate()-1)).toISOString()')
        v-col(cols='6')
          v-menu(v-model='monthMenu')
            template(v-slot:activator='{ on }')
              v-text-field(clearable
              readonly
              :label="$t('todo.create.month')"
              prepend-icon="event"
              v-on='on'
              v-model='todo.month')
            v-date-picker(@input='monthMenu = false'
            v-model='todo.month'
            :min='new Date(new Date().setMonth(new Date().getMonth()+1)).toISOString()'
            type='month')
      v-row
        v-col(cols='6')
          v-switch(:label='$t("todo.create.frog")')
        v-col(cols='6')
          v-switch(:label='$t("todo.create.completed")')
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Todo } from "../models/todo";

@Component({
  props: {
    todo: Object
  }
})
export default class TodoForm extends Vue {
  dateMenu = false;
  monthMenu = false;
}
</script>