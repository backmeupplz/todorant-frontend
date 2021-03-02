<template lang="pug">
v-container(style='maxWidth: 1000px;', v-observe-visibility='visibilityChanged')
  v-row(no-gutters, v-if='!external')
    v-col.d-flex.flex-row(cols=12)
      v-text-field(
        v-model='hashtag',
        :label='$t("report.hashtag")',
        prefix='#',
        :append-outer-icon='hashtag ? "search" : "refresh"',
        @click:append-outer='refresh',
        clearable,
        dense,
        v-on:keydown='enterDown'
      )
      v-btn.ml-2(v-if='!more', icon, @click='more = true')
        v-icon more_horiz
    v-col(v-if='more', cols=12, sm=6)
      v-menu(v-model='startDateMenu', min-width=0)
        template(v-slot:activator='{ on }')
          v-text-field(
            clearable,
            readonly,
            :label='$t("report.startDate")',
            prepend-icon='event',
            v-on='on',
            v-model='startDate'
          )
        v-date-picker(
          @input='startDateMenu = false',
          v-model='startDate',
          :first-day-of-week='safeFirstDayOfWeek',
          :locale='language',
          :show-current='todayFormatted'
        )
    v-col(v-if='more', cols=12, sm=6)
      v-menu(v-model='endDateMenu', min-width=0)
        template(v-slot:activator='{ on }')
          v-text-field(
            clearable,
            readonly,
            :label='$t("report.endDate")',
            prepend-icon='event',
            v-on='on',
            v-model='endDate'
          )
        v-date-picker(
          @input='endDateMenu = false',
          v-model='endDate',
          :first-day-of-week='safeFirstDayOfWeek',
          :locale='language',
          :show-current='todayFormatted'
        )
  v-row(v-else)
    v-col.text-center(v-if='!!name')
      p.display-1 {{ name }}, {{ $t("report.title").toLowerCase() }}{{ hashtag ? ` #${hashtag}` : "" }}
  v-row
    v-progress-linear(v-if='loading', indeterminate)
    v-col.text-center.mt-4(
      v-if='!loading && !Object.keys(completedTodosData).length'
    )
      p.display-3 😳
      p.headline {{ $t("noReport.title") }}
      p.body-1 {{ $t("noReport.text") }}
  .mb-4(v-if='Object.keys(completedTodosData).length')
    v-row.text-center(no-gutters)
      v-col.justify-center(cols=12, sm=6)
        p.headline {{ $t("report.tasksCompleted") }}: {{ completedTodosCount }}
      v-col.justify-center(cols=12, sm=6)
        p.headline {{ $t("report.frogsCompleted") }}: {{ completedFrogsCount }}
    v-row
      v-col(cols=12, sm=6)
        v-card.d-flex.pa-6
          canvas#todos
      v-col(cols=12, sm=6)
        v-card.d-flex.pa-6
          canvas#frogs
    div(v-if='!external')
      v-row.pt-4.text-center
        v-col
          p.display-1 {{ $t("report.share") }}
      v-row.justify-center(v-if='!url')
        v-btn(color='primary', @click='share') {{ $t("report.shareButton") }}
      .pa-2(v-else)
        v-row.justify-center.text-center
          p
            | {{ $t("report.url") }}:
            | {{ " " }}
            a(:href='url', target='_blank') {{ url }}
        v-row.flex-row.justify-center
          twitter-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
          facebook-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
          linked-in-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
          email-button.share-button--circle(btnText, :url='url')
          evernote-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
          odnoklassniki-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
          pinterest-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
          pocket-button.share-button--circle(btnText, :url='url')
          reddit-button.share-button--circle(
            btnText,
            :url='url',
            :title='$t("report.shareMessage")'
          )
          telegram-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
          viber-button.share-button--circle(btnText, :url='url')
          whats-app-button.share-button--circle(btnText, :url='url')
          vkontakte-button.share-button--circle(
            btnText,
            :url='url',
            :description='$t("report.shareMessage")'
          )
    div(v-else)
      v-row.pt-4.text-center
        v-col
          p.display-1 {{ $t("report.call") }}
      v-row.justify-center(v-if='!url')
        v-btn(color='primary', @click='goHome') {{ $t("report.callButton") }}
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as api from '@/utils/api'
import { i18n } from '@/plugins/i18n'
import TwitterButton from 'vue-share-buttons/src/components/TwitterButton'
import FacebookButton from 'vue-share-buttons/src/components/FacebookButton'
import LinkedInButton from 'vue-share-buttons/src/components/LinkedInButton'
import EmailButton from 'vue-share-buttons/src/components/EmailButton'
import EvernoteButton from 'vue-share-buttons/src/components/EvernoteButton'
import OdnoklassnikiButton from 'vue-share-buttons/src/components/OdnoklassnikiButton'
import PinterestButton from 'vue-share-buttons/src/components/PinterestButton'
import PocketButton from 'vue-share-buttons/src/components/PocketButton'
import RedditButton from 'vue-share-buttons/src/components/RedditButton'
import TelegramButton from 'vue-share-buttons/src/components/TelegramButton'
import ViberButton from 'vue-share-buttons/src/components/ViberButton'
import VkontakteButton from 'vue-share-buttons/src/components/VkontakteButton'
import WhatsAppButton from 'vue-share-buttons/src/components/WhatsAppButton'
import dayjs from 'dayjs'
import { Prop, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
const Chart = require('chart.js/dist/Chart.bundle')

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')
const SettingsStore = namespace('SettingsStore')
const AppStore = namespace('AppStore')

@Component({
  components: {
    TwitterButton,
    FacebookButton,
    LinkedInButton,
    EmailButton,
    EvernoteButton,
    OdnoklassnikiButton,
    PinterestButton,
    PocketButton,
    RedditButton,
    TelegramButton,
    ViberButton,
    VkontakteButton,
    WhatsAppButton,
  },
})
export default class Report extends Vue {
  @Prop({ default: false }) external!: boolean

  @AppStore.State dark!: boolean
  @UserStore.State user?: User
  @AppStore.State language?: string
  @SettingsStore.State firstDayOfWeek?: number
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false

  completedTodosData: object = {}
  completedFrogsData: object = {}

  completedTodosCount = 0
  completedFrogsCount = 0

  hashtag = ''
  url = ''

  charts: any[] = []

  name = ''

  more = false

  startDateMenu = false
  startDate: null | string = null

  endDateMenu = false
  endDate: null | string = null

  mounted() {
    this.refresh()
  }

  visibilityChanged(isVisible: boolean) {
    if (isVisible) {
      this.refresh()
    }
  }

  renderChart(canvasName: string, canvasData: any) {
    const ctx = document.getElementById(canvasName) as HTMLCanvasElement
    if (!ctx) {
      return
    }
    const context = ctx.getContext('2d')
    if (!context) {
      return
    }
    if (this.charts.length >= 2) {
      this.charts.forEach((chart) => chart.destroy())
      this.charts = []
    }
    this.charts.push(
      new Chart(context, {
        type: 'bar',
        data: canvasData,
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  stepSize: 2,
                  min: 0,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  color: 'rgba(0, 0, 0, 0)',
                },
              },
            ],
          },
        },
      })
    )
  }

  convertData(data: any, title: string) {
    if (!Object.keys(data).length) {
      return {
        labels: [],
        datasets: [
          {
            label: i18n.t(title),
            backgroundColor: 'rgba(255, 100, 26, 0.8)',
            data: [],
          },
        ],
      }
    }

    const keys = Object.keys(data).sort((a, b) =>
      new Date(a) < new Date(b) ? -1 : 1
    )
    const firstDay = new Date(this.startDate || keys[0])

    // this line is needed so that the counter starts from the first day. otherwise, for some unknown reason, the counter starts from the next day.
    let i = new Date(firstDay.setDate(firstDay.getDate() - 1))
    const days = []
    while (i < (this.endDate ? new Date(this.endDate) : new Date())) {
      days.push(i)
      i = new Date(i.setDate(i.getDate() + 1))
    }

    const daysToCompletedMap = keys.reduce((prev, cur) => {
      prev[new Date(cur).toLocaleDateString(this.language)] = data[cur]
      return prev
    }, {} as any)

    const labels = days.map((k) => k.toLocaleDateString(this.language))
    const completedData = labels.map((l) => daysToCompletedMap[l])

    return {
      labels,
      datasets: [
        {
          categoryPercentage: 0.25,
          label: i18n.t(title),
          backgroundColor: 'rgba(255, 100, 26, 0.8)',
          borderColor: 'rgba(255, 100, 26, 1)',
          data: completedData,
          borderWidth: 1.5,
        },
      ],
    }
  }

  async refresh() {
    const user = this.user
    if (!user && !this.external) {
      return
    }
    this.loading = true
    try {
      let data: any
      if (this.external) {
        const result = await api.getPublicReport(
          this.$router.currentRoute.params.pathMatch
        )
        data = result.meta

        this.hashtag = result.hash || ''
        this.name = result.user
      } else {
        data = await api.getReport(
          user!,
          this.hashtag,
          this.startDate,
          this.endDate
        )
      }
      this.completedTodosData = this.convertData(
        data.completedTodosMap || {},
        'report.tasksCompleted'
      )
      this.completedFrogsData = this.convertData(
        data.completedFrogsMap || {},
        'report.frogsCompleted'
      )
      this.completedTodosCount = (Object.values(
        data.completedTodosMap || {}
      ) as number[]).reduce((prev, cur) => prev + cur, 0)
      this.completedFrogsCount = (Object.values(
        data.completedFrogsMap || {}
      ) as number[]).reduce((prev, cur) => prev + cur, 0)
      this.url = ''
      this.renderChart('frogs', this.completedFrogsData)
      this.renderChart('todos', this.completedTodosData)
    } catch (err) {
      console.error(err)
      this.setSnackbarError('errors.report')
    } finally {
      this.loading = false
    }
  }

  async share() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      const shared = await api.getSharedReport(user, this.hashtag)
      this.url = `https://todorant.com/report/${shared.uuid}`
    } catch (err) {
      console.error(err)
      this.setSnackbarError('errors.report')
    } finally {
      this.loading = false
    }
  }

  async goHome() {
    try {
      await this.$router.replace(this.user ? '/superpower' : '/')
    } catch (err) {
      // Do nothing
    }
  }

  get safeFirstDayOfWeek() {
    const storeFirstDayOfWeek = this.firstDayOfWeek
    return storeFirstDayOfWeek === undefined
      ? this.language === 'ru'
        ? 1
        : 0
      : storeFirstDayOfWeek
  }

  get todayFormatted() {
    return dayjs(new Date()).format('YYYY-MM-DD')
  }

  enterDown(evt: any) {
    if (evt.keyCode == 13) {
      if (evt.type == 'keydown') {
        ;(this as any).refresh()
      }
      evt.preventDefault()
    }
  }
}
</script>
