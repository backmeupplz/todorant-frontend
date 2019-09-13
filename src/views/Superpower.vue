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
import * as store from "../plugins/store";
import { i18n } from "../plugins/i18n";
import { mergeTelegram } from "../utils/api";

@Component({ components: { TodoList, AddTodo, CurrentTodo } })
export default class Superpower extends Vue {
  currentTab = 0;

  async created() {
    // Try telegram merge
    if (this.$route.query && this.$route.query.hash) {
      const user = store.user();
      if (!user || user.telegramId) {
        return;
      }
      try {
        const loginInfo = this.$route.query;
        if (
          !confirm(i18n.t("merge.confirm", {
            id: loginInfo.id
          }) as string)
        ) {
          return;
        }
        await mergeTelegram(user, loginInfo);
      } catch (err) {
        store.setSnackbarError("errors.login.telegram");
      }
    }
  }

  mounted() {
    if (this.$router.currentRoute.hash) {
      this.currentTab = 1;
    }

    // http://localhost:8080/?id=76104711&first_name=Nikita&last_name=K&username=borodutch&photo_url=https%3A%2F%2Ft.me%2Fi%2Fuserpic%2F320%2Fg1CvSJ-zoKbvIv7S3EFA6zDsutnjau7S1FGLuHc2z4U.jpg&auth_date=1568336084&hash=693e0a3813a09b014134d4abb1ccba431e4dd8a6855d021eba2b5b62382c140b
  }

  @Watch("currentTab")
  currentTabChanged(val: any, oldVal: any) {
    if (val !== oldVal) {
      serverBus.$emit("refreshRequested");
    }
  }
}
</script>