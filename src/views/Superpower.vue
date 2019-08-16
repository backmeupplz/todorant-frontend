<template lang="pug">
  div
    // Tabs
    v-tabs(v-model='currentTab' :fixed-tabs='$vuetify.breakpoint.xsOnly' show-arrows)
      v-tab {{$t('current')}}
      v-tab {{$t('planning')}}
      v-tabs-items(v-model='currentTab')
        v-tab-item(:value='0')
          span 0
        v-tab-item(:value='1')
          TodoList
    // Add FAB
    AddTodo
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoList from "../components/TodoList.vue";
import AddTodo from "../components/AddTodo.vue";

@Component({ components: { TodoList, AddTodo } })
export default class Superpower extends Vue {
  currentTab = 1;
}
</script>