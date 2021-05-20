import store from '@/store'
import SettingsStore from '@/store/modules/SettingsStore'
import { getModule } from 'vuex-module-decorators'

let settingsStore: SettingsStore

export function getDateString(date: Date) {
  if (!settingsStore) setSettingsStore()
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
}

export function getTodayWithStartOfDay() {
  if (!settingsStore) setSettingsStore()
  const now = new Date()
  const today = new Date()
  const startTimeOfDay = settingsStore.safeStartTimeOfDay
  if (!startTimeOfDay) return now
  today.setHours(parseInt(startTimeOfDay.substr(0, 2)))
  today.setMinutes(parseInt(startTimeOfDay.substr(3)))

  if (now < today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday
  } else {
    return now
  }
}

// Hack to avoid SettingsStore is undefined in recursion store calls
function setSettingsStore() {
  settingsStore = getModule(SettingsStore, store)
}
