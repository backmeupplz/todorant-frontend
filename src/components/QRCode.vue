<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  @click:outside='close')
    v-card
      v-card-title {{$t('qr.code')}}
      v-card-text
        p {{$t('qr.description')}}
        .d-flex.justify-center
          .loader(v-if='!imageUrl')
          img(v-else
          width='300px'
          height='300px'
          :src='imageUrl')
      v-card-actions
        v-spacer
        v-btn(color='default'
          text
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close') {{$t('close')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getSvgDataURL } from 'cnf-qrcode'
import * as store from '../plugins/store'

@Component({
  props: {
    dialog: Boolean,
    close: Function,
  },
})
export default class QRCode extends Vue {
  imageUrl = ''

  mounted() {
    const user = store.user()
    if (!user) {
      return
    }
    const userString = JSON.stringify(user)
    getSvgDataURL(userString, undefined, (err: any, url: string) => {
      if (err) {
        console.log(err)
      } else {
        this.imageUrl = url
      }
    })
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
