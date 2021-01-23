<template lang="pug">
v-dialog(v-model='dialog', max-width='600px', @click:outside='close')
  v-card(:color='$vuetify.theme.dark ? "grey darken-4" : "grey lighten-4"')
    v-card-title {{ $t("heroProfileTitle") }}
    .d-flex.ma-2
      .d-flex.flex-column
        VerticalBar.ml-4.mr-4(:color='colorSchemes', :progresss='progress')
      .ma-2.max-width
        .ml-2.mt-2 {{ nextRank - points }} {{ `${$t("pointsTillNextLevel")}` }}
        v-card.ml-1.mt-4.self-align-center(
          :color='$vuetify.theme.dark ? "grey darken-3" : undefined'
        )
          v-card-title {{ $t("level") }} {{ rank }}
          v-card-text {{ $t(`rank${rank}Title`) }}
        .ml-2.mt-2 {{ $t(`rank${rank}Description`) }}
    v-divider.ma-2
    div(
      v-for='lowerRank in ranksRef',
      v-bind:key='lowerRank',
      v-if='lowerRank < rank'
    ) 
      .d-flex.ma-2
        .d-flex.max-width
          .d-flex.flex-column
            VerticalBar.ml-4.mr-4(:color='colorSchemes', :progresss='100')
          .ma-2.max-width
            v-card.ml-1.mt-4.self-align-center(
              :color='$vuetify.theme.dark ? "grey darken-3" : undefined'
            )
              v-card-title {{ $t("level") }} {{ lowerRank }}
              v-card-text {{ $t(`rank${lowerRank}Title`) }}
            .ml-2.mt-2 {{ $t(`rank${lowerRank}Description`) }}
    v-btn(
      color='default',
      text,
      @click='close',
      v-shortkey.once='["esc"]',
      @shortkey.native='close'
    ) {{ $t("close") }}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import VerticalBar from './VertiсalProgressBar.vue'
import { namespace } from 'vuex-class'
import { ranks } from '@/assets/ranks'

const ColorScheme = require('color-scheme')
const HeroStore = namespace('HeroStore')

@Component({
  components: { VerticalBar },
  props: {
    dialog: Boolean,
    close: Function,
  },
})
export default class HeroProfile extends Vue {
  @HeroStore.State points!: number
  @HeroStore.Getter rank!: number
  @HeroStore.Getter nextRank!: number
  @HeroStore.Getter progress!: number

  created() {
    this.generateColorScheme()
  }

  ranksRef = ranks

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

<style>
.max-width {
  width: 100%;
}
</style>
