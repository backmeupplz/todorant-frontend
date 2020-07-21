<template lang="pug">
div
  .v-container.pa-4
    v-row.mx-0.mb-4
      v-btn.mr-1(icon, @click='settingsDialog = true', :loading='loading')
        v-icon supervisor_account
      v-btn(icon, @click='loadData', :loading='loading')
        v-icon refresh
    div(v-if='!loading')
      NoDelegates(v-if='!delegates.length')
  DelegateSettings(:dialog='settingsDialog', :close='closeSettingsDialog')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DelegateSettings from '@/views/delegate/DelegateSettings.vue'
import NoDelegates from '@/views/delegate/NoDelegates.vue'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { serverBus } from '@/main'
import * as api from '@/utils/api'

const DelegateStore = namespace('DelegateStore')
const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    DelegateSettings,
    NoDelegates,
  },
})
export default class Delegate extends Vue {
  @UserStore.State user?: User
  @DelegateStore.State delegates!: User[]
  @DelegateStore.State delegators!: User[]
  @DelegateStore.Mutation setDelegates!: (delegates: User[]) => void
  @DelegateStore.Mutation setDelegators!: (delegators: User[]) => void
  @DelegateStore.Mutation setToken!: (token: string) => void
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false
  settingsDialog = true

  mounted() {
    this.loadData()
  }

  created() {
    serverBus.$on('refreshRequested', () => {
      this.loadData()
    })
  }

  closeSettingsDialog() {
    this.settingsDialog = false
  }

  async loadData() {
    if (!this.user) {
      return
    }
    if (this.loading) {
      return
    }
    this.loading = true
    try {
      const response = await api.getDelegateInfo(this.user)
      this.setDelegates(response.delegates)
      this.setDelegators(response.delegators)
      this.setToken(response.token)
    } catch (err) {
      console.error(err)
      this.setSnackbarError('errors.loadTodos')
    } finally {
      this.loading = false
    }
  }
}
</script>
