<template lang="pug">
  div
    // Tabs
    v-tabs(v-model='currentTab' :fixed-tabs='$vuetify.breakpoint.xsOnly' show-arrows)
      v-tab {{$t('current')}}
      v-tab {{$t('planning')}}
      v-tabs-items(v-model='currentTab')
        v-tab-item(:value='0')
          CurrentTodo
        v-tab-item(:value='1')
          TodoList
    // Add FAB
    AddTodo
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoList from "../components/TodoList.vue";
import CurrentTodo from "../components/CurrentTodo.vue";
import AddTodo from "../components/AddTodo.vue";
import { Watch } from "vue-property-decorator";
import { serverBus } from "../main";

@Component({ components: { TodoList, AddTodo, CurrentTodo } })
export default class Superpower extends Vue {
  currentTab = 0;

  @Watch("currentTab")
  currentTabChanged(val: any, oldVal: any) {
    if (val !== oldVal) {
      serverBus.$emit("refreshRequested");
    }
  }
}
</script>