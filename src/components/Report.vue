<template lang="pug">
  v-container(style='maxWidth: 1000px;')
    v-row
      v-progress-linear(v-if='loading' indeterminate=true)
      p {{JSON.stringify(data, undefined, 2)}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as api from "../utils/api";
import * as store from "../plugins/store";

@Component
export default class Report extends Vue {
  loading = false;

  data = {} as {
    completedTodosMap?: { [index: string]: number };
  };

  mounted() {
    console.log("mounted");
    this.loadReport();
  }

  async loadReport() {
    const user = store.user();
    if (!user) {
      return;
    }
    this.loading = true;
    try {
      this.data = await api.getReport(user);
    } catch (err) {
      console.error(err);
      store.setSnackbarError("errors.report");
    } finally {
      this.loading = false;
    }
  }
}
</script>

