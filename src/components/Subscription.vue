<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("subscription.title") }}
    v-card-text
      p {{ $t("subscription.statusText", { status: subscriptionStatusText }) }}
      p {{ subscriptionDescriptionText }}
      p(v-if='subscriptionIdExists && subscriptionStatus === "earlyAdopter"') {{ $t("subscription.earlyAdopterBonus") }}
      p(align='right')
        | —
        a(href='mailto:nikita@borodutch.com') {{ $t("subscription.signature") }}
      .text-center(v-if='!subscriptionIdExists')
        v-btn.ma-2(:loading='loading', @click='redirectToPurchase("monthly")') {{ $t("subscription.5dollars") }}
        v-btn.ma-2(
          color='primary',
          :loading='loading',
          @click='redirectToPurchase("yearly")'
        ) {{ $t("subscription.50dollars") }}
    v-card-actions.d-flex.flex-column(v-if='this.$vuetify.breakpoint.xsOnly')
      v-btn(
        v-if='subscriptionIdExists',
        text,
        color='error',
        :loading='loading',
        @click='cancelSubscription'
      ) {{ $t("subscription.cancel") }}
      v-btn(
        color='blue',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey='close',
        :loading='loading'
      ) {{ $t("close") }}
    v-card-actions(v-else)
      v-spacer
      v-btn(
        v-if='subscriptionIdExists',
        text,
        color='blue',
        :loading='loading',
        @click='manageSubscription'
      ) {{ $t("subscription.manage") }}
      v-btn(
        color='blue',
        text,
        @click='close',
        v-shortkey.once='["esc"]',
        @shortkey='close',
        :loading='loading'
      ) {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { i18n } from '@/plugins/i18n'
import { daysBetween } from '@/utils/daysBetween'
import * as api from '@/utils/api'
import { serverBus } from '@/main'
import { logEvent } from '@/utils/logEvent'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { SubscriptionStatus } from '@/models/SubscriptionStatus'
import { User } from '@/models/User'

// Stripe object is global, declaring here for TS
declare const Stripe: any

const stripe = Stripe(process.env.VUE_APP_STRIPE)

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component
export default class Subscription extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  @UserStore.State subscriptionStatus!: SubscriptionStatus
  @UserStore.State createdAt!: Date
  @UserStore.State user?: User
  @UserStore.State subscriptionIdExists!: boolean
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void
  @SnackbarStore.Mutation setSnackbar!: (snackbarStore: any) => void

  loading = false

  get subscriptionStatusText() {
    if (
      this.subscriptionStatus === SubscriptionStatus.trial &&
      this.createdAt
    ) {
      return `${i18n.t(`subscription.${this.subscriptionStatus}`)} ${i18n.t(
        'subscription.daysLeft',
        {
          daysLeft: 30 - daysBetween(new Date(this.createdAt), new Date()),
        }
      )}`
    } else {
      return i18n.t(`subscription.${this.subscriptionStatus}`)
    }
  }
  get subscriptionDescriptionText() {
    return i18n.t(`subscription.${this.subscriptionStatus}Description`)
  }

  async redirectToPurchase(plan: api.Plan) {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      const session = await api.getPlanSession(user, plan)
      const result = await stripe.redirectToCheckout({
        sessionId: session.session,
      })
      if (result.error) {
        this.setSnackbarError(result.error.message)
        return
      }
      this.setSnackbar({
        message: i18n.t('subscription.success') as string,
        active: true,
        color: 'success',
      })
      ;(this as any).close()
      logEvent('subscription_success', {
        status: this.subscriptionStatus,
      })
    } catch (err) {
      this.setSnackbarError(err.message)
      logEvent('subscription_purchase_error', {
        status: this.subscriptionStatus,
        error: err.message,
      })
    } finally {
      this.loading = false
    }
  }

  async manageSubscription() {
    const user = this.user
    if (!user) {
      return
    }
    this.loading = true
    try {
      if (user.appleReceipt) {
        window.open('https://support.apple.com/en-us/HT202039', '_blank')
      } else if (user.googleReceipt) {
        window.open(
          'https://support.google.com/googleplay/answer/7018481',
          '_blank'
        )
      } else {
        const url = await api.manageSubscriptionUrl()
        window.location.href = url
      }
    } catch (err) {
      this.setSnackbarError(err.message)
      logEvent('subscription_cancel_error', {
        status: this.subscriptionStatus,
        error: err.message,
      })
    } finally {
      this.loading = false
    }
  }
}
</script>
