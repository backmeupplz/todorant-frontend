<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  persistent)
    v-card
      v-card-title {{$t('supportAlert.title')}}
      v-card-text(v-html="$t('supportAlert.text')")
      v-card-actions
        v-spacer
        v-btn(color='default'
          text
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close') {{$t('close')}}
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    dialog: Boolean,
    close: Function
  }
})
export default class Support extends Vue {}
</script>
