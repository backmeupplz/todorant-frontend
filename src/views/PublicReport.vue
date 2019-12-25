<template lang="pug">
  Report(external)
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { reportGA } from "../utils/ga";
import Report from "../components/Report.vue";

@Component({
  components: { Report }
})
export default class PublicReport extends Vue {
  mounted() {
    reportGA("public_report_viewed");
  }
}
</script>