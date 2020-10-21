<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("apps") }}
    v-card-text
      DownloadLinks(:showsWeb='false')
    v-card-actions
      v-spacer
      v-btn(
        color='default',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey.native='close'
      ) {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import DownloadLinks from '@/components/DownloadLinks.vue'

@Component({
  components: {
    DownloadLinks,
  },
})
export default class Apps extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
}
</script>
