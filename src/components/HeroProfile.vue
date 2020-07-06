<template lang="pug">
  v-dialog(v-model='dialog'
  max-width='600px'
  @click:outside='close')
    v-card(:color='$vuetify.theme.dark ? "grey darken-4" : "grey lighten-4"')
      v-card-title {{$t('heroProfileTitle')}}
      div.d-flex.ma-2
        div.d-flex.flex-column
          VerticalBar.ml-4.mr-4(:colorArr='colorSchemes' :progresss='this.$store.state.progress')
        div.ma-2
          div.ml-2.mt-2 {{ $store.state.nextRank - $store.state.points }} {{(`${$t('pointsTillNextLevel')}`)}}
          v-card.ml-1.mt-4(:color='$vuetify.theme.dark ? "grey darken-3" : undefined')
            v-card-title {{$t('level')}} {{($store.state.rank)}}
            v-card-text {{$t(`rank${$store.state.rank}Title`)}}
          div.ml-2.mt-2 {{$t(`rank${$store.state.rank}Description`)}}
      v-divider.ma-2
      div(v-for='lowerRank in ranks' v-bind:key="lowerRank" v-if='lowerRank < $store.state.rank') 
        div.d-flex.ma-2
          div.d-flex
            div.d-flex.flex-column
              VerticalBar.ml-4.mr-4(:colorArr='colorSchemes' :progresss='100')
            div.ma-3
              v-card.ml-1.mt-4.justify-end(:color='$vuetify.theme.dark ? "grey darken-3" : undefined')
                v-card-title {{(`${$t('level')} ${lowerRank}`)}}
                v-card-text {{$t(`rank${lowerRank}Title`)}}
              div.ml-2.mt-2 {{$t(`rank${lowerRank}Description`)}}
        v-divider.ma-2
      v-btn(color='default'
        text
        @click='close'
        v-shortkey.once="['esc']"
        @shortkey='close') {{$t('close')}}

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getTodos } from '../utils/api'
import * as store from '../plugins/store'
import VerticalBar from './VertiсalProgressBar.vue'
const ColorScheme = require('color-scheme')

@Component({
  components: { VerticalBar },
  props: {
    dialog: Boolean,
    close: Function,
  },
})
export default class HeroProfile extends Vue {
  created() {
    this.generateColorScheme()
  }
  ranks = [
    0,
    5,
    13,
    42,
    69,
    85,
    100,
    221,
    256,
    300,
    404,
    777,
    800,
    1337,
    1338,
    2048,
    9000,
    12800,
    1000000,
  ].reverse()

  colorSchemes = [] as string[][]

  generateColorScheme() {
    for (let i = 0; i < 360; i += 15) {
      const scheme = new ColorScheme()
      scheme.from_hue(i).scheme('mono').variation('soft')
      this.colorSchemes.push(scheme.colors().map((c: any) => `#${c}`))
    }
  }
}
</script>
