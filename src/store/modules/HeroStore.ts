import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { ranks } from '@/assets/ranks'

@Module({ namespaced: true, name: 'HeroStore' })
export default class HeroStore extends VuexModule {
  points: number = 0

  @Mutation
  setHeroStore(heroStore: HeroStore) {
    Object.assign(this, heroStore)
  }
  @Mutation
  setPoints(points: number) {
    this.points = points
  }

  get rank() {
    let nearest = 0
    for (const i of ranks) {
      if (i > nearest && i <= this.points) {
        nearest = i
      }
    }
    return nearest
  }

  get nextRank() {
    return ranks[ranks.indexOf(this.rank) - 1]
  }

  get progress() {
    return Math.ceil(
      ((this.points - this.rank) / (this.nextRank - this.rank)) * 100
    )
  }
}
