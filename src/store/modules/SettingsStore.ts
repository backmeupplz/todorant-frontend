import { GoogleCalendarCredentials } from '@/models/GoogleCalendarCredentials'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'SettingsStore' })
export default class SettingsStore extends VuexModule {
  showTodayOnAddTodo?: boolean = undefined
  firstDayOfWeek?: number = undefined
  startTimeOfDay?: any = undefined
  newTodosGoFirst?: boolean = undefined
  preserveOrderByTime?: boolean = undefined
  googleCalendarCredentials?: GoogleCalendarCredentials = undefined
  duplicateTagInBreakdown?: boolean = undefined
  language?: string = undefined

  audioEnabled = true
  hotKeysEnabled = true
  customHotKey = false
  swipeActionsEnabled = false
  coloredCardBackgrounds = false

  @Mutation
  setSettingsStore(settingsStore: SettingsStore) {
    Object.assign(this, settingsStore)
  }

  @Mutation
  setGoogleCalendarCredentials(
    googleCalendarCredentials: GoogleCalendarCredentials
  ) {
    this.googleCalendarCredentials = googleCalendarCredentials
  }

  @Mutation
  setAudioEnabled(audioEnabled: boolean) {
    this.audioEnabled = audioEnabled
  }

  @Mutation
  setShowTodayOnAddTodo(showTodayOnAddTodo: boolean) {
    this.showTodayOnAddTodo = showTodayOnAddTodo
  }

  @Mutation
  setHotKeysEnabled(hotsetHotKeysEnabled: boolean) {
    this.hotKeysEnabled = hotsetHotKeysEnabled
    if (!hotsetHotKeysEnabled) {
      this.customHotKey = false
    }
  }

  @Mutation
  setCustomHotKey(customHotKey: boolean) {
    this.customHotKey = customHotKey
  }

  @Mutation
  setSwipeActionsEnabled(swipeActionsEnabled: boolean) {
    this.swipeActionsEnabled = swipeActionsEnabled
  }

  @Mutation
  setСoloredCardBackgrounds(coloredCardBackgrounds: boolean) {
    this.coloredCardBackgrounds = coloredCardBackgrounds
  }

  @Mutation
  setFirstDayOfWeek(firstDayOfWeek: number) {
    this.firstDayOfWeek = firstDayOfWeek
  }

  @Mutation
  setStartTimeOfDay(startTimeOfDay: any) {
    this.startTimeOfDay = startTimeOfDay
  }

  @Mutation
  setNewTodosGoFirst(newTodosGoFirst: boolean) {
    this.newTodosGoFirst = newTodosGoFirst
  }

  @Mutation
  setPreserveOrderByTime(preserveOrderByTime: boolean) {
    this.preserveOrderByTime = preserveOrderByTime
  }

  @Mutation
  setDuplicateTagInBreakdown(duplicateTagInBreakdown: boolean) {
    this.duplicateTagInBreakdown = duplicateTagInBreakdown
  }
}
