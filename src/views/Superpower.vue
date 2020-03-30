<template lang="pug">
  div.pb-10
    // Tabs (panning = false)
    v-tabs(v-if='!$store.state.userState.planning'
    v-model='currentTab'
    :fixed-tabs='$vuetify.breakpoint.xsOnly'
    show-arrows)
      v-tab(v-shortkey.once="{ en: ['c'], ru: ['с'] }" @shortkey='currentTab = 0') {{$t('current')}}
      v-tab(v-shortkey.once="{ en: ['p'], ru: ['з'] }" @shortkey='currentTab = 1') {{$t('planning')}}
      v-tab {{$t('report.title')}}
      v-tabs-items(v-model='currentTab')
        v-tab-item(:value='0')
          CurrentTodo
        v-tab-item(:value='1')
          TodoList
        v-tab-item(:value='2')
          Report
        // Add FAB
        AddTodo(v-if='!$store.state.editting' :currentTab='currentTab')
    // Tabs (planning = true)
    v-tabs(v-else
    :value='1'
    :fixed-tabs='$vuetify.breakpoint.xsOnly'
    show-arrows)
      v-tab(disabled) {{$t('current')}}
      v-tab {{$t('planning')}}
      v-tab(disabled) {{$t('report.title')}}
      v-tabs-items(:value='1')
        v-tab-item(:value='0')
          .display-3.text-center ☁️
        v-tab-item(:value='1')
          TodoList
        v-tab-item(:value='2')
          .display-3.text-center ☁️
        // Add FAB
        AddTodo(v-if='!$store.state.editting' :currentTab='currentTab')
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import TodoList from "../components/TodoList.vue";
import CurrentTodo from "../components/CurrentTodo.vue";
import Report from "../components/Report.vue";
import AddTodo from "../components/AddTodo.vue";
import { Watch } from "vue-property-decorator";
import { serverBus } from "../main";
import * as store from "../plugins/store";
import { i18n } from "../plugins/i18n";
import { mergeTelegram } from "../utils/api";

@Component({ components: { TodoList, AddTodo, CurrentTodo, Report } })
export default class Superpower extends Vue {
  currentTab = 0;

  async created() {
    // Try telegram merge
    const query = this.$route.query;
    if (query && query.hash) {
      const user = store.user();
      if (!user || user.telegramId) {
        return;
      }
      try {
        const loginInfo = query;
        if (
          !confirm(
            i18n.t("merge.confirm", {
              id: loginInfo.id
            }) as string
          )
        ) {
          return;
        }
        await mergeTelegram(user, loginInfo);
      } catch (err) {
        store.setSnackbarError("errors.login.telegram");
      } finally {
        this.$router.replace("/superpower");
      }
    }
  }

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
    store.setEditting(false);
  }
}
</script>
