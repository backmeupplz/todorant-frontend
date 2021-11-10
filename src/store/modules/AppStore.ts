import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  language?: string = undefined
  dark = true
  rulesShown = false
  editting = false

  todoDialog = false

  todayDateTitle = ''

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

  @Mutation
  setTodayTitle(todayDateTitle: string) {
    this.todayDateTitle = todayDateTitle
  }
}
