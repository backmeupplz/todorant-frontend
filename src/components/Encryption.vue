<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  @click:outside='close')
    v-card
      v-card-title {{$t('encryption.title')}}
      v-card-text
        p {{$t('encryption.info')}}
        v-row(no-gutters)
          v-switch(:label='$t("encryption.switch")' v-model='encryptionOn')
        div(v-if='encryptionOn')
          v-row(no-gutters)
            v-text-field(:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            clearable
            :label="$t('encryption.password')"
            v-model='password'
            :rules='passwordRules'
            ref='dateInput'
            :type='show ? "text" : "password"'
            @click:append="show = !show")
          //- v-row(no-gutters v-if='!dirty')
          //-   v-btn.mr-2(color='red'
          //-   @click='encryptAll'
          //-   @shortkey='close'
          //-   :loading='loading') {{$t('encryption.encryptAllButton')}}
          //-   v-btn(color='red'
          //-   @click='decryptAll'
          //-   @shortkey='close'
          //-   :loading='loading') {{$t('encryption.decryptAllButton')}}
      v-card-actions
        v-spacer
        v-btn(color='default'
          text
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
          :loading='loading') {{$t('close')}}
        v-btn(v-if='dirty && saveble'
          color='default'
          text
          @click='save'
          v-shortkey.once="['esc']"
          @shortkey='save'
          :loading='loading') {{$t('save')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as store from '../plugins/store'
import { i18n } from '../plugins/i18n'
import { serverBus } from '../main'

@Component({
  props: {
    dialog: Boolean,
    close: Function,
  },
})
export default class Encryption extends Vue {
  encryptionOn = false
  password = ''
  show = false

  passwordRules = [(v: any) => !!v]

  loading = false

  mounted() {
    this.password = store.password() || ''
    this.encryptionOn = !!this.password
  }

  get dirty() {
    return (
      (store.password() !== this.password &&
        !!store.password() !== !!this.password) ||
      this.encryptionOn !== !!store.password() ||
      (!!this.password &&
        !!store.password() &&
        this.password !== store.password())
    )
  }
  get saveble() {
    return (
      (!this.encryptionOn && !!store.password()) ||
      (!!this.password && !store.password()) ||
      (!!this.password &&
        !!store.password() &&
        this.password !== store.password())
    )
  }

  save() {
    if (!!store.password() && !this.encryptionOn) {
      if (confirm(i18n.t('encryption.disableConfirm') as string)) {
        store.setPassword(undefined)
      }
    } else {
      if (confirm(i18n.t('encryption.confirm') as string)) {
        store.setPassword(this.password)
      }
    }
    serverBus.$emit('refreshRequested')
  }

  encryptAll() {}
  decryptAll() {}
}
</script>
