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
import { namespace } from 'vuex-class'
import { drawQR } from '@/utils/drawQR'
import QRCodeStyling from 'qr-code-styling'
import { checkQrLogin, generateQrUuid, loginToken } from '@/utils/api'
import { User } from '@/models/User'
const UserStore = namespace('UserStore')

@Component
export default class QRCode extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void
  @Prop({ required: true }) description!: string
  @Prop({ required: true }) qrRendered!: QRCodeStyling
  @Prop({ required: true }) changeQr!: (newQr: QRCodeStyling) => void
  @Prop() webLogin: boolean = false
  @Prop() loginSuccess?: (user: User, provider: string) => void
  @Prop() loginError?: (error: Error, provider: string) => void

  @UserStore.State user?: User

  loading = true
  qrUuid = ''
  tenMinutes = 10 * 60 * 1000
  mobileLoginError?: Error
  checkLogin?: NodeJS.Timeout
  updateTimeout?: NodeJS.Timeout
  updateInterval?: NodeJS.Timeout

  async visibilityChanged(isVisible: boolean) {
    if (isVisible) {
      if (this.webLogin) {
        // For web login
        await this.newUuid()
        await this.updateOrCreateCanvas(this.qrUuid)
        await this.stopLoading()
        this.checkLoginInterval()

        // Regenerate QR code every 10 minutes and show error
        this.updateTimeout = setTimeout(() => {
          this.updateInterval = setInterval(async () => {
            await this.newUuid()
            await this.updateOrCreateCanvas(this.qrUuid)
            if (!this.loginError || !this.mobileLoginError) return
            this.loginError(this.mobileLoginError, 'mobile')
          }, this.tenMinutes)
        }, this.tenMinutes)
        return
      }
      if (this.user && this.user.token) {
        // For app login
        await this.updateOrCreateCanvas(this.user.token)
        await this.stopLoading()
      }
      return
    }
    if (this.webLogin) {
      this.clearAllIntervals()
    }
  }

  async stopLoading() {
    await this.qrRendered._drawingPromise
    this.loading = false
  }

  async newUuid() {
    this.qrUuid = await generateQrUuid()
  }

  async updateOrCreateCanvas(data: string) {
    if (!Object.keys(this.qrRendered).length) {
      this.changeQr(drawQR('qrCanvas', data))
      return
    }
    this.qrRendered.update({ data })
  }

  checkLoginInterval() {
    // Check is user loggined every 5 seconds
    this.checkLogin = setInterval(async () => {
      try {
        const token = await checkQrLogin(this.qrUuid)
        if (!token) {
          throw new Error('Token is undefined')
        }
        const user = await loginToken(token)
        if (user) {
          this.clearAllIntervals()
          if (!this.loginSuccess) return
          this.loginSuccess(user, 'mobile')
        }
      } catch (err) {
        this.mobileLoginError = err
      }
    }, 5_000)
  }

  clearAllIntervals() {
    if (this.checkLogin) {
      clearInterval(this.checkLogin)
    }
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout)
    }
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
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
