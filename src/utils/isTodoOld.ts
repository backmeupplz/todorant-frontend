import { Todo } from '@/models/Todo'
import store from '@/store'

function getDateFromTime(date: string, time: string) {
  return new Date(
    parseInt(date.substr(0, 4)),
    parseInt(date.substr(5, 7)),
    parseInt(date.substr(8)),
    parseInt(time.substr(0, 2)),
    parseInt(time.substr(3))
  )
}

export function isTodoOld(todo: Todo, date: string) {
  const day = date.substr(8)
  const monthAndYear = date.substr(0, 7)
  const yesterday = `${parseInt(day) - 1}`
  const startTimeOfDay = store.state.SettingsStore.startTimeOfDay || '00:00'
  const now = new Date()
  const todayDate = getDateFromTime(date, startTimeOfDay)

  // Exact date exists or not
  if (todo.date) {
    if (todo.monthAndYear < monthAndYear) {
      return true
    }
    if (
      todo.monthAndYear === monthAndYear &&
      todo.date == yesterday &&
      now >= todayDate
    ) {
      return true
    }
    if (todo.monthAndYear === monthAndYear && todo.date < yesterday) {
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
