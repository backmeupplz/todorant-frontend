<template lang="pug">
.pb-10
  // Tabs (panning = false)
  v-tabs(
    v-if='!planning',
    v-model='currentTab',
    :fixed-tabs='$vuetify.breakpoint.xsOnly',
    show-arrows
  )
    v-tab(v-shortkey.once='{ en: ["c"], ru: ["с"] }', @shortkey='switchTab(0)') {{ $t("current") }}
    v-tab(v-shortkey.once='{ en: ["p"], ru: ["з"] }', @shortkey='switchTab(1)') {{ $t("planning") }}
    v-tab {{ $t("report.title") }}
    v-tab {{ $t("delegate.title") }}
    v-tabs-items(v-model='currentTab')
      v-tab-item(:value='0')
        CurrentTodo
      v-tab-item(:value='1')
        Planning
      v-tab-item(:value='2')
        Report
      v-tab-item(:value='3')
        Delegation
      // Add FAB
      AddTodo(v-if='!editting', :currentTab='currentTab')
  // Tabs (planning = true)
  v-tabs(
    v-else,
    :value='1',
    :fixed-tabs='$vuetify.breakpoint.xsOnly',
    show-arrows
  )
    v-tab(disabled) {{ $t("current") }}
    v-tab {{ $t("planning") }}
    v-tab(disabled) {{ $t("report.title") }}
    v-tab(disabled) {{ $t("delegate.title") }}
    v-tabs-items(:value='1')
      v-tab-item(:value='0')
        .display-3.text-center ☁️
      v-tab-item(:value='1')
        Planning
      v-tab-item(:value='2')
        .display-3.text-center ☁️
      v-tab-item(:value='3')
        .display-3.text-center ☁️
      // Add FAB
      AddTodo(v-if='!editting', :currentTab='currentTab')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Planning from '@/views/planning/Planning.vue'
import CurrentTodo from '@/components/CurrentTodo.vue'
import Report from '@/components/Report.vue'
import AddTodo from '@/components/AddTodo.vue'
import Delegation from '@/views/delegation/Delegation.vue'
import { Watch } from 'vue-property-decorator'
import { serverBus } from '@/main'
import { i18n } from '@/plugins/i18n'
import { mergeTelegram } from '@/utils/api'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')
const AppStore = namespace('AppStore')
const SettingsStore = namespace('SettingsStore')

@Component({
  components: { Planning, AddTodo, CurrentTodo, Report, Delegation },
})
export default class Superpower extends Vue {
  @UserStore.State user?: User
  @UserStore.State planning!: boolean
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @AppStore.Mutation setEditting!: (editting: boolean) => void
  @AppStore.State editting!: boolean
  @SettingsStore.State hotKeysEnabled!: boolean

  currentTab = 0

  async created() {
    // Try telegram merge
    const query = this.$route.query
    if (query && query.hash) {
      const user = this.user
      if (!user || user.telegramId) {
        return
      }
      try {
        const loginInfo = query
        if (
          !confirm(
            i18n.t('merge.confirm', {
              id: loginInfo.id,
            }) as string
          )
        ) {
          return
        }
        await mergeTelegram(user, loginInfo)
      } catch (err) {
        this.setSnackbarError('errors.login.telegram')
      } finally {
        this.$router.replace('/superpower')
      }
    }
  }

  mounted() {
    if (this.$router.currentRoute.hash) {
      this.currentTab = 1
    }
  }

  @Watch('currentTab')
  currentTabChanged(val: any, oldVal: any) {
    if (val !== oldVal) {
      serverBus.$emit('refreshRequested')
    }
    this.setEditting(false)
  }

  switchTab(tabIndex: number) {
    if (!this.hotKeysEnabled) {
      return
    }
    this.currentTab = tabIndex
  }
}
</script>

<style>
.v-tab {
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 20px !important;
  line-height: 20px !important;

  /* identical to box height, or 100% */
  letter-spacing: -0.24px !important;

  text-transform: capitalize !important;

  opacity: 0.4 !important;
}
.v-tab--active {
  opacity: 1 !important;
  color: #0f0f0f !important;
}
.theme--dark .v-tab--active {
  color: #ffffff !important;
}

.v-tabs-slider {
  background: #ff641a !important;
  border-radius: 20px !important;
}

.v-tabs-bar__content {
  background-color: #ffffff !important;
}
.theme--dark .v-tabs-bar__content {
  background-color: #121212 !important;
}

.v-slide-group__next {
  background-color: #ffffff !important;
}
.theme--dark .v-slide-group__next {
  background-color: #121212 !important;
}

.v-slide-group__prev {
  background-color: #ffffff !important;
}
.theme--dark .v-slide-group__prev {
  background-color: #121212 !important;
}

.theme--light .v-tabs .v-tab:hover::before .v-tab--active {
  opacity: 0.2 !important;
}
</style>
