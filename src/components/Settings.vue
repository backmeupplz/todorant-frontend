<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  @click:outside='close')
    v-card
      v-card-title {{$t('settings.title')}}
      v-card-text
        v-switch(:label='$t("settings.showTodayOnAddTodo")'
        v-model='showTodayOnAddTodo')
        v-switch(:label='$t("settings.newTodosGoFirst")'
        v-model='newTodosGoFirst')
        v-switch(:label='$t("settings.preserveOrderByTime")'
        v-model='preserveOrderByTime')
        v-select(:items='weekdays'
        :label='$t("settings.firstDayOfWeek")'
        v-model='firstDayOfWeek')
      v-card-actions
        v-spacer
        v-btn(color='error'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
          :loading='loading') {{$t('close')}}
        v-btn(color='blue'
          text 
          @click='save'
          @shortkey='close'
          :loading='loading') {{$t('save')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as store from "../plugins/store";
import * as api from "../utils/api";
import { serverBus } from "../main";
import { i18n } from "../plugins/i18n";

@Component({
  props: {
    dialog: Boolean,
    close: Function
  }
})
export default class Settings extends Vue {
  loading = false;

  weekdays = [1, 2, 3, 4, 5, 6, 0].map(n => ({
    text: i18n.t(`weekdays.${n}`),
    value: n
  }));

  get showTodayOnAddTodo() {
    return store.userState().settings.showTodayOnAddTodo || false;
  }
  set showTodayOnAddTodo(val: boolean) {
    store.userState().settings.showTodayOnAddTodo = val;
  }

  get firstDayOfWeek() {
    const storeFirstDayOfWeek = this.$store.state.userState.settings
      .firstDayOfWeek;
    return storeFirstDayOfWeek === undefined
      ? this.$store.state.language === "ru"
        ? 1
        : 0
      : storeFirstDayOfWeek;
  }
  set firstDayOfWeek(val: number) {
    store.userState().settings.firstDayOfWeek = val;
  }

  get newTodosGoFirst() {
    return this.$store.state.userState.settings.newTodosGoFirst;
  }
  set newTodosGoFirst(val: boolean) {
    store.userState().settings.newTodosGoFirst = val;
  }

  get preserveOrderByTime() {
    return this.$store.state.userState.settings.preserveOrderByTime;
  }
  set preserveOrderByTime(val: boolean) {
    store.userState().settings.preserveOrderByTime = val;
  }

  async save() {
    const user = store.user();
    if (!user) {
      return;
    }
    this.loading = true;
    try {
      await api.setSettings(user, store.userState().settings);
      serverBus.$emit("refreshRequested");
      (this as any).close();
    } catch (err) {
      store.setSnackbarError(err.response ? err.response.data : err.message);
    } finally {
      this.loading = false;
    }
  }
}
</script>
