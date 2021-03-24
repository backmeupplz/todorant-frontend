<template lang="pug">
Report
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { logEvent } from '@/utils/logEvent'
import Report from '@/views/Report.vue'

@Component({
  components: { Report },
})
export default class PublicReport extends Vue {
  mounted() {
    logEvent('public_report_viewed')
  }
}
</script>
