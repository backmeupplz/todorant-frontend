<template lang="pug">
.v-container.pa-4.text-center
  p(v-html='$t("loginMobile.telegram.headline")')
  v-text-field(
    clearable,
    :label='$t("loginMobile.telegram.id")',
    :hint='$t("loginMobile.telegram.idHint")',
    v-model='id',
    autofocus
  )
  v-btn(color='primary', @click='login', :loading='loading || checking') {{ $t("loginMobile.telegram.loginButton") }}
  p.pt-2(v-if='checking', v-html='$t("loginMobile.telegram.waiting")')
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { loginTelegram } from '@/utils/api'
import { i18n } from '@/plugins/i18n'
const { vueTelegramLogin } = require('vue-telegram-login')
import { v4 as uuid } from 'uuid'
import * as api from '@/utils/api'

@Component
export default class LoginTelegram extends Vue {
  id = ''

  loading = false
  checking = false

  loginId = ''

  mounted() {
    setInterval(() => {
      this.check()
    }, 5 * 1000)
  }

  async login() {
    if (!this.id && !this.id) {
      alert(i18n.t('loginMobile.telegram.noCredentialsError'))
      return
    }
    this.loginId = uuid()
    try {
      this.loading = true
      await api.telegramLoginRequest(this.loginId, this.id)
      this.checking = true
    } catch (err) {
      if (err.message === 'Request failed with status code 404') {
        alert(i18n.t('loginMobile.telegram.cannotSendMessageError'))
      } else {
        alert(err.message)
      }
      console.log(err)
    } finally {
      this.loading = false
    }
  }

  async check() {
    if (!this.checking || !this.loginId) {
      return
    }
    const result = (await api.checkTelegramLoginRequest(this.loginId)).data
    if (result.allowed === undefined) {
      return
    } else if (result.allowed === false) {
      alert(i18n.t('loginMobile.telegram.notAllowedError'))
      this.checking = false
      this.loginId = ''
    } else if (result.allowed === true) {
      window.location.href = `${
        process.env.VUE_APP_WEBSITE
      }/mobile_login_success?data=${JSON.stringify(result.user)}`
    }
  }
}
</script>
