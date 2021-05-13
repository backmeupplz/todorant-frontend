<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("qr.code") }}
    v-card-text
      p {{ $t(description) }}
      .d-flex.justify-center
        .loader(v-if='loading')
        #qrCanvas(v-observe-visibility='visibilityChanged')
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
import { drawQR } from '@/utils/drawQR'
import QRCodeStyling from 'qr-code-styling'

@Component
export default class QRCode extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) valueForQr!: string
  @Prop({ required: true }) description!: string
  @Prop({ required: true }) qrRendered!: QRCodeStyling
  @Prop({ required: true }) changeQr!: (newQr: QRCodeStyling) => void

  loading = true

  async visibilityChanged(isVisible: boolean) {
    if (!this.valueForQr) {
      return
    } else if (isVisible && !Object.keys(this.qrRendered).length) {
      this.changeQr(drawQR('qrCanvas', this.valueForQr))
      await this.qrRendered._drawingPromise
      this.loading = false
    }
  }
}
</script>

<style>
.loader {
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
