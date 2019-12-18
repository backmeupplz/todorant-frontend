<template lang="pug">
  v-container(style='maxWidth: 1000px;')
    v-row(v-observe-visibility='visibilityChanged')
      v-progress-linear(v-if='loading' indeterminate=true)
      v-col(v-if='!loading && !Object.keys(data).length').text-center.mt-4
        p.display-3 😳
        p.headline {{$t('noReport.title')}}
        p.body-1 {{$t('noReport.text')}}
    v-card(v-if='Object.keys(data).length')
      v-card-text
        bar-chart(:chartData="data").ma-4
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as api from '../utils/api'
import * as store from '../plugins/store'
import BarChart from './BarChart.vue'
import { i18n } from '../plugins/i18n'

@Component({ components: { BarChart } })
export default class Report extends Vue {
  loading = false

  data: object = {}

  mounted() {
    this.loadReport()
  }

  async loadReport() {
    const user = store.user()
    if (!user) {
      return
    }
    this.loading = true
    try {
      this.data = this.convertData(
        (await api.getReport(user)).completedTodosMap
      )
    } catch (err) {
      console.error(err)
      store.setSnackbarError('errors.report')
    } finally {
      this.loading = false
    }
  }

  visibilityChanged(isVisible: boolean) {
    if (isVisible) {
      this.loadReport()
    }
  }

  convertData(data: any) {
    if (!Object.keys(data).length) {
      return {}
    }

    const keys = Object.keys(data).sort((a, b) =>
      new Date(a) < new Date(b) ? -1 : 1
    )
    const firstDay = new Date(keys[0])
    let i = firstDay
    const days = []
    while (i < new Date()) {
      days.push(i)
      i = new Date(i.setDate(i.getDate() + 1))
    }

    const daysToCompletedMap = keys.reduce((prev, cur) => {
      prev[new Date(cur).toLocaleDateString()] = data[cur]
      return prev
    }, {} as any)

    const labels = days.map(k => k.toLocaleDateString())
    const completedData = labels.map(l => daysToCompletedMap[l])

    return {
      labels,
      datasets: [
        {
          label: i18n.t('report.tasksCompleted'),
          backgroundColor: '#f87979',
          data: completedData,
        },
      ],
    }
  }
}
</script>
