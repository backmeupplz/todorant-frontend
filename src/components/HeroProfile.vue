<template lang="pug">
  v-dialog(v-model='dialog'
  scrollable
  max-width='600px'
  @click:outside='close')
    v-card(height="100%")
      v-card-title {{$t('heroProfileTitle')}}
      v-card-subtitle.ma-0 {{$t('infoHero')}}
        v-divider.ma-2
        v-card-text.text-center.body-1.font-weight-medium {{$t('rank')}}
        v-card.ma-4.rounded(
          :color='$vuetify.theme.dark ? "blue-grey darken-2" : "blue lighten-4"')
          v-card-text.text-center.font-weight-medium {{$t(`rank${$store.state.rank}Title`)}}
          v-card-text.text-center {{$t(`rank${$store.state.rank}Description`)}}
          v-card-text.text-center.font-weight-black {{$t(`nextRank`, { points: nextRank})}}
        v-card.ma-4.rounded(v-for='lowerRank in ranks' 
        :color='$vuetify.theme.dark ? "blue-grey darken-4" : "blue lighten-3"') 
          v-card-text.text-center.font-weight-medium(v-if='lowerRank < $store.state.rank') {{$t(`rank${lowerRank}Title`)}}
          v-card-text.text-center(v-if='lowerRank < $store.state.rank') {{$t(`rank${lowerRank}Description`)}}
        v-btn(color='default'
          text
          @click='close'
          v-shortkey.once="['esc']"
          @shortkey='close') {{$t('close')}}
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { getTodos, getHeroPoints, initializeHeroPoints } from '../utils/api'
import * as store from '../plugins/store'

@Component({
  props: {
    dialog: Boolean,
    close: Function,
  },
})
export default class HeroProfile extends Vue {
  ranks = [
    1000000,
    12800,
    9000,
    2048,
    1338,
    1337,
    800,
    777,
    404,
    300,
    256,
    221,
    100,
    85,
    69,
    42,
    13,
    5,
    0,
  ]
  nextRank = 0
  created() {
    this.updateRank()
  }
  async updateRank() {
    const user = store.user()
    if (!user) {
      return
    }
    const completedTodos = await getTodos(user, true, 0, 1000000)
    const points = completedTodos.length
    this.$store.state.points = points
    initializeHeroPoints(user, points)
    this.$store.state.rank = this.nearestRank(points)
    this.nextRank =
      this.ranks.reverse()[this.ranks.indexOf(this.$store.state.rank) + 1] -
      this.$store.state.points
  }
  nearestRank(points: number) {
    let nearest = 0
    for (const i of this.ranks) {
      if (i > nearest && i <= this.$store.state.points) {
        nearest = i
      }
    }
    return nearest
  }
}
</script>
