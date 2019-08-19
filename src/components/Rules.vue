<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  persistent)
    v-card
      v-card-title {{$t('howto.title')}}
      v-card-text
        ul
          li(v-for='i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]' v-html='$t(`howto.rules.${i}`)')
      v-card-actions
        v-spacer
        v-btn(color='blue'
          text 
          @click='close') {{$t('cookie.button')}}
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
export default class Rules extends Vue {}
</script>
