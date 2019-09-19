<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  persistent)
    v-card
      v-card-title {{$t('settings.title')}}
      v-card-text
        v-switch(:label='$t("settings.showTodayOnAddTodo")'
        v-model='showTodayOnAddTodo')
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

  weekdays = [
    {
      text: i18n.t("weekdays.monday"),
      value: 1
    },
    {
      text: i18n.t("weekdays.tuesday"),
      value: 2
    },
    {
      text: i18n.t("weekdays.wednesday"),
      value: 3
    },
    {
      text: i18n.t("weekdays.thursday"),
      value: 4
    },
    {
      text: i18n.t("weekdays.friday"),
      value: 5
    },
    {
      text: i18n.t("weekdays.saturday"),
      value: 6
    },
    {
      text: i18n.t("weekdays.sunday"),
      value: 0
    }
  ];

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
