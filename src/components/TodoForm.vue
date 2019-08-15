<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header
      span {{todo.text || $t('todo.create.placeholder')}}
    v-expansion-panel-content
      v-text-field(:label="$t('todo.create.text')" 
      :hint="$t('todo.create.textHint')")
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
export default class TodoForm extends Vue {}
</script>