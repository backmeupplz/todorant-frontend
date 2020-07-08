import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  language?: string = undefined
  dark = false
  rulesShown = false
  editting = false
  landingABTestGroup = Math.floor(Math.random() * 2)

  @Mutation
  setLanguage(language: string) {
    this.language = language
  }

  @Mutation
  setDark(dark: boolean) {
    this.dark = dark
  }

  @Mutation
  setRulesShown(rulesShown: boolean) {
    this.rulesShown = rulesShown
  }

  @Mutation
  setEditting(editting: boolean) {
    this.editting = editting
  }
}
