import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'HeroStore' })
export default class HeroStore extends VuexModule {
  points: number = 0
  rank: number = 0
  nextRank: number = 0
  progress: number = 0

  @Mutation
  setHeroStore(heroStore: HeroStore) {
    Object.assign(this, heroStore)
  }
  @Mutation
  setPoints(points: number) {
    this.points = points
  }
  @Mutation
  setRank(rank: number) {
    this.rank = rank
  }
  @Mutation
  setNextRank(nextRank: number) {
    this.nextRank = nextRank
  }
  @Mutation
  setProgress(progress: number) {
    this.progress = progress
  }
}
