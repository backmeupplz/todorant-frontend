<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  persistent)
    v-card
      v-card-title {{$t('howto.title')}}
      v-card-text
        ul
          li(v-for='rule in $t("howto.rules")' v-html='rule')
        .title.py-2 {{$t('howto.bonus.title')}}
        ul
          li(v-for='rule in $t("howto.bonus.rules")' v-html='rule')
      v-card-actions.d-flex.flex-column(v-if='this.$vuetify.breakpoint.xsOnly')
        v-btn(
          v-if='!!$store.state.user'
          color='blue'
          text 
          @click='openWelcomeDialog'
        ) {{$t('introButton')}}
        v-spacer
        v-btn(
          color='blue'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
        ) {{$t('cookie.button')}}
      v-card-actions(v-else)
        v-btn(
          v-if='!!$store.state.user'
          color='blue'
          text 
          @click='openWelcomeDialog'
        ) {{$t('introButton')}}
        v-spacer
        v-btn(
          color='blue'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
        ) {{$t('cookie.button')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    dialog: Boolean,
    close: Function,
    openWelcome: Function,
  },
})
export default class Rules extends Vue {
  openWelcomeDialog() {
    this.$props.close()
    this.$props.openWelcome()
  }
}
</script>
