<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header
      span Todo 1
    v-expansion-panel-content
      v-text-field(:label="$t('todo.create.text')" 
      :hint="$t('todo.create.textHint')")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class TodoForm extends Vue {}
</script>