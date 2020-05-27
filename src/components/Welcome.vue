<template lang="pug">
  v-dialog(
    v-model='dialog'
    scrollable
    max-width='600px'
    persistent
  )
    v-card
      v-card-title {{$t('introTitle')}}
      v-card-text
        p {{$t('intro1')}}
        p {{$t('intro2')}}
        p {{$t('intro4')}}
        p {{$t('intro5')}}
      v-card-actions
        v-btn(
          color='blue'
          text 
          @click='openRulesDialog'
        ) {{$t('howto.title')}}
        v-spacer
        v-btn(
          color='blue'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
        ) {{$t('introBack')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    dialog: Boolean,
    close: Function,
    openRules: Function,
  },
})
export default class Welcome extends Vue {
  openRulesDialog() {
    this.$props.close()
    this.$props.openRules()
  }
}
</script>
