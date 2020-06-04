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
        iframe(
          v-if='!$store.state.language || $store.state.language === "en"'
          style="width: 100%; min-height: 300px"
          src='https://www.youtube-nocookie.com/embed/EHI8gCtHTII'
          frameborder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen=''
        )
        iframe(
          v-else-if='$store.state.language === "ru"'
          style="width: 100%; min-height: 300px"
          src='https://www.youtube-nocookie.com/embed/VWs4GFr9blI'
          frameborder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen=''
        )
      v-card-actions.d-flex.flex-column(v-if='this.$vuetify.breakpoint.xsOnly')
        v-btn(
          block
          color='blue'
          text 
          @click='openRulesDialog'
        ) {{$t('howto.title')}}
        v-btn(
          color='blue'
          text 
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close'
        ) {{$t('introBack')}}
      v-card-actions(v-else)
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
