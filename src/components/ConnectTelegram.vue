<template lang="pug">
v-dialog(
  v-model='dialog',
  scrollable,
  max-width='600px',
  @click:outside='close'
)
  v-card
    v-card-title {{ $t("connectTelegram.title") }}
    v-card-text
      p(v-if='done') {{ $t("merge.done") }}
    v-layout.text-center(column, justify-center, align-center)
      vue-telegram-login(
        mode='callback',
        telegram-login='todorant_bot',
        @callback='onTelegramAuth',
        radius='3',
        :userpic='false',
        v-if='!user || !user.telegramId'
      )
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
import { i18n } from '@/plugins/i18n'
const { vueTelegramLogin } = require('vue-telegram-login')
import { mergeTelegram } from '@/utils/api'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { User } from '@/models/User'

const UserStore = namespace('UserStore')
const SnackbarStore = namespace('SnackbarStore')

@Component({
  components: {
    vueTelegramLogin,
  },
})
export default class Merge extends Vue {
  @Prop({ required: true }) dialog!: boolean
  @Prop({ required: true }) close!: () => void

  @UserStore.State user?: User
  @SnackbarStore.Mutation setSnackbarError!: (error: string) => void

  loading = false

  get done() {
    const user = this.user
    if (!user) {
      return false
    }
    return !!user.telegramId
  }
  async onTelegramAuth(loginInfo: any) {
    this.loading = true
    try {
      if (!this.user) {
        return
      }
      if (
        !confirm(
          i18n.t('merge.confirm', {
            id: loginInfo.id,
          }) as string
        )
      ) {
        return
      }
      await mergeTelegram(this.user, loginInfo)
    } catch (err) {
      this.setSnackbarError('errors.login.telegram')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style></style>
