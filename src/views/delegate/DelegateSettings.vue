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
        v-btn.mr-1(
          icon,
          v-clipboard:copy='delegateInviteLink',
          :loading='loading'
        )
          v-icon assignment
        v-btn.mr-2(icon, :loading='loading', @click='resetToken')
          v-icon refresh
        .title.clickable(v-clipboard:copy='delegateInviteLink') {{ delegateInviteLink }}
      // Delegates
      v-divider.mt-2
      v-subheader.pa-0 {{ $t("delegate.delegates") }}
      p(v-if='!delegates.length') {{ $t("delegate.noDelegates") }}
      .d-flex.align-center(
        v-else,
        v-for='(delegate, i) in delegates',
        :key='i'
      )
        span {{ delegate.name }}
        v-btn.ml-2(icon, small)
          v-icon(small, @click='deleteDelegate(delegate)', :loading='loading') delete
      // Delegators
      v-divider.mt-2
      v-subheader.pa-0 {{ $t("delegate.delegators") }}
      p(v-if='!delegators.length') {{ $t("delegate.noDelegators") }}
      .d-flex.align-center(
        v-else,
        v-for='(delegator, i) in delegators',
        :key='i'
      )
        span {{ delegator.name }}
        v-btn.ml-2(icon, small)
          v-icon(
            small,
            @click='deleteDelegator(delegator)',
            :loading='loading'
          ) delete
    v-card-actions
      v-spacer
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
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'
import * as api from '@/utils/api'
import { i18n } from '@/plugins/i18n'

const DelegateStore = namespace('DelegateStore')
const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component
export default class DelegateSettings extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  @UserStore.State user?: User
  @DelegateStore.State delegates!: User[]
  @DelegateStore.State delegators!: User[]
  @DelegateStore.Getter delegateInviteLink!: string
  @DelegateStore.State token?: string
  @DelegateStore.Mutation setDelegates!: (delegates: User[]) => void
  @DelegateStore.Mutation setDelegators!: (delegators: User[]) => void
  @DelegateStore.Mutation setToken!: (token: string) => void
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false

  save() {
    this.close()
  }

  async loadData() {
    if (!this.user) {
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

  async resetToken() {
    if (!confirm(i18n.t('delegate.resetConfirmation') as string)) {
      return
    }
    if (!this.user) {
      return
    }
    this.loading = true
    try {
      const token = await api.resetDelegateToken(this.user)
      this.setToken(token)
    } catch (err) {
      console.error(err)
      this.setSnackbarError('errors.loadTodos')
    } finally {
      this.loading = false
    }
  }

  async deleteDelegate(delegate: User) {
    if (!confirm(i18n.t('delegate.deleteDelegateConfirmation') as string)) {
      return
    }
    if (!this.user) {
      return
    }
    this.loading = true
    try {
      const token = await api.deleteDelegate(this.user, delegate._id)
      this.loadData()
    } catch (err) {
      console.error(err)
      this.setSnackbarError(err.message)
    } finally {
      this.loading = false
    }
  }

  async deleteDelegator(delegator: User) {
    if (!confirm(i18n.t('delegate.deleteDelegatorConfirmation') as string)) {
      return
    }
    if (!this.user) {
      return
    }
    this.loading = true
    try {
      await api.deleteDelegator(this.user, delegator._id)
      this.loadData()
    } catch (err) {
      console.error(err)
      this.setSnackbarError(err.message)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
.title {
  overflow-wrap: anywhere;
}
</style>
