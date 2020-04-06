<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  @click:outside='close')
    v-card
      v-card-title {{$t('subscription.title')}}
      v-card-text
        p {{$t('subscription.statusText', { status: subscriptionStatusText })}}
        p {{subscriptionDescriptionText}}
        p(v-if='$store.state.userState.subscriptionIdExists && $store.state.userState.subscriptionStatus === "earlyAdopter"') {{$t('subscription.earlyAdopterBonus')}}
        p(align='right')
          | — 
          a(href='mailto:nikita@borodutch.com') {{$t('subscription.signature')}}
        .text-center(v-if='!$store.state.userState.subscriptionIdExists')
          v-btn.ma-2(:loading='loading'
          @click='redirectToPurchase("monthly")') {{$t('subscription.5')}}
          v-btn.ma-2(color='primary'
          :loading='loading'
          @click='redirectToPurchase("yearly")') {{$t('subscription.50')}}
      v-card-actions
        v-spacer
        v-btn(v-if='$store.state.userState.subscriptionIdExists'
        text
        color='error'
        :loading='loading'
        @click='cancelSubscription') {{$t('subscription.cancel')}}
        v-btn(color='blue'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
          :loading='loading') {{$t('close')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { i18n } from "../plugins/i18n";
import * as store from "../plugins/store";
import { daysBetween } from "../utils/daysBetween";
import * as api from "../utils/api";
import { serverBus } from "../main";
import { reportGA } from "../utils/ga";

// Stripe object is global, declaring here for TS
declare const Stripe: any;

const stripe = Stripe(process.env.VUE_APP_STRIPE);

@Component({
  props: {
    dialog: Boolean,
    close: Function
  }
})
export default class Subscription extends Vue {
  loading = false;

  get subscriptionStatusText() {
    if (
      store.userState().subscriptionStatus === store.SubscriptionStatus.trial &&
      store.userState().createdAt
    ) {
      return `${i18n.t(
        `subscription.${store.userState().subscriptionStatus}`
      )} ${i18n.t("subscription.daysLeft", {
        daysLeft:
          30 - daysBetween(new Date(store.userState().createdAt), new Date())
      })}`;
    } else {
      return i18n.t(`subscription.${store.userState().subscriptionStatus}`);
    }
  }
  get subscriptionDescriptionText() {
    return i18n.t(
      `subscription.${store.userState().subscriptionStatus}Description`
    );
  }

  async redirectToPurchase(plan: api.Plan) {
    const user = store.user();
    if (!user) {
      return;
    }
    this.loading = true;
    try {
      const session = await api.getPlanSession(user, plan);
      const result = await stripe.redirectToCheckout({
        sessionId: session.session
      });
      if (result.error) {
        store.setSnackbarError(result.error.message);
        return;
      }
      store.setSnackbar({
        message: i18n.t("subscription.success") as string,
        active: true,
        color: "success"
      });
      (this as any).close();
      reportGA("subscription_success", {
        status: store.userState().subscriptionStatus
      });
    } catch (err) {
      store.setSnackbarError(err.message);
      reportGA("subscription_purchase_error", {
        status: store.userState().subscriptionStatus,
        error: err.message
      });
    } finally {
      this.loading = false;
    }
  }

  async cancelSubscription() {
    const user = store.user();
    if (!user) {
      return;
    }
    this.loading = true;
    try {
      if (!confirm(i18n.t("subscription.cancelConfirm") as string)) {
        return;
      }
      const session = await api.cancelSubscription(user);
      (this as any).close();
      serverBus.$emit("refreshRequested");
      reportGA("subscription_canceled", {
        status: store.userState().subscriptionStatus
      });
    } catch (err) {
      store.setSnackbarError(err.message);
      reportGA("subscription_cancel_error", {
        status: store.userState().subscriptionStatus,
        error: err.message
      });
    } finally {
      this.loading = false;
    }
  }
}
</script>
