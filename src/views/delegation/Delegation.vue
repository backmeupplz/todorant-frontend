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
  DelegationSettings(:dialog='settingsDialog', :close='closeSettingsDialog')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DelegationSettings from '@/views/delegation/DelegationSettings.vue'
import NoDelegates from '@/views/delegation/NoDelegates.vue'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import { serverBus } from '@/main'
import * as api from '@/utils/api'
import { sockets } from '../../utils/sockets'

const DelegationStore = namespace('DelegationStore')
const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    DelegationSettings,
    NoDelegates,
  },
})
export default class Delegation extends Vue {
  @DelegationStore.State delegates!: User[]
  @DelegationStore.State delegators!: User[]
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false
  settingsDialog = false

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
    if (this.loading) {
      return
    }
    this.loading = true
    try {
      sockets.delegateSyncManager.sync()
      // Fetch todos
    } catch (err) {
      console.error(err)
      this.setSnackbarError('errors.loadTodos')
    } finally {
      this.loading = false
    }
  }
}
</script>
