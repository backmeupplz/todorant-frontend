import { Todo } from '@/models/Todo'
import store from '@/store'
import SettingsStore from '@/store/modules/SettingsStore'
import { getModule } from 'vuex-module-decorators'

const settingsStore = getModule(SettingsStore, store)

export function isTodoOld(todo: Todo, date: string) {
  const day = date.substr(8)
  const monthAndYear = date.substr(0, 7)
  const yesterday = `${parseInt(day) - 1}`
  const startTimeOfDay = settingsStore.safeStartTimeOfDay || '00:00'
  const now = new Date()
  const todayDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    Number(startTimeOfDay.substr(0, 2)),
    Number(startTimeOfDay.substr(3))
  )

  // Exact date exists or not
  if (todo.date) {
    if (todo.monthAndYear < monthAndYear) {
      return true
    }
    if (
      todo.monthAndYear === monthAndYear &&
      parseInt(todo.date) == parseInt(yesterday) &&
      now >= todayDate
    ) {
      return true
    }
    if (
      todo.monthAndYear === monthAndYear &&
      parseInt(todo.date) < parseInt(yesterday)
    ) {
      return true
    }
  } else {
    if (todo.monthAndYear <= monthAndYear) {
      return true
    }
  }
  return false
}

export function isDateTooOld(date: string, today: string) {
  const todayDay = today.substr(8)
  const todayMonthAndYear = today.substr(0, 7)

  if (date.length === 7) {
    // month and year
    if (date <= todayMonthAndYear) {
      return true
    }
  } else {
    const day = date.substr(8)
    const monthAndYear = date.substr(0, 7)
    if (monthAndYear < todayMonthAndYear) {
      return true
    }
    if (monthAndYear === todayMonthAndYear && day < todayDay) {
      return true
    }
  }
  return false
}
