<template lang="pug">
  div
    // Tabs (panning = false)
    v-tabs(v-if='!$store.state.planning'
    v-model='currentTab'
    :fixed-tabs='$vuetify.breakpoint.xsOnly'
    show-arrows)
      v-tab(v-shortkey.once="{ en: ['c'], ru: ['с'] }" @shortkey='currentTab = 0') {{$t('current')}}
      v-tab(v-shortkey.once="{ en: ['p'], ru: ['з'] }" @shortkey='currentTab = 1') {{$t('planning')}}
      v-tabs-items(v-model='currentTab')
        v-tab-item(:value='0')
          CurrentTodo
        v-tab-item(:value='1')
          TodoList
    // Tabs (planning = true)
    v-tabs(v-else
    :value='1'
    :fixed-tabs='$vuetify.breakpoint.xsOnly'
    show-arrows)
      v-tab(disabled) {{$t('current')}}
      v-tab {{$t('planning')}}
      v-tabs-items(:value='1')
        v-tab-item(:value='0')
          .display-3.text-center ☁️
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

  mounted() {
    if (this.$router.currentRoute.hash) {
      this.currentTab = 1;
    }
  }

  @Watch("currentTab")
  currentTabChanged(val: any, oldVal: any) {
    if (val !== oldVal) {
      serverBus.$emit("refreshRequested");
    }
  }
}
</script>