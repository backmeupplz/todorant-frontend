<template lang="pug">
div
  .v-container.pa-4
    v-row.mx-0.mb-4
      v-btn.mr-1(icon, @click='settingsDialog = true')
        v-icon settings
      v-btn(icon)
        v-icon refresh
    v-row.mx-0
      p {{ $t("delegate.noDelegates") }}
  DelegateSettings(:dialog='settingsDialog', :close='closeSettingsDialog')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DelegateSettings from '@/views/delegate/DelegateSettings.vue'

@Component({
  components: {
    DelegateSettings,
  },
})
export default class Delegate extends Vue {
  settingsDialog = true

  closeSettingsDialog() {
    this.settingsDialog = false
  }
}
</script>
