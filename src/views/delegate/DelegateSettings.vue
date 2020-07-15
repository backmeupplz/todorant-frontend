<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("delegate.title") }}
    v-card-text
      // Link
      v-subheader.pa-0 {{ $t("delegate.link") }}
      p {{ $t("delegate.linkDescription") }}
      .d-flex
        v-btn.mr-1(icon, v-clipboard:copy='link')
          v-icon assignment
        v-btn.mr-2(icon)
          v-icon refresh
        .title.clickable(v-clipboard:copy='link') {{ link }}
      // Delegates
      v-divider.mt-2
      v-subheader.pa-0 {{ $t("delegate.delegates") }}
      p {{ $t("delegate.noDelegates") }}
      // Delegators
      v-divider.mt-2
      v-subheader.pa-0 {{ $t("delegate.delegators") }}
      p {{ $t("delegate.noDelegators") }}
    v-card-actions
      v-spacer
      v-btn(
        color='error',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey='close'
      ) {{ $t("close") }}
      v-btn(color='blue', text, @click='save') {{ $t("save") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class DelegateSettings extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  get link() {
    return 'https://todorant.com/invite/12345'
  }

  save() {
    this.close()
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
