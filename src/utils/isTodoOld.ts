// Dependencies
import { Todo } from '../models/todo'

export function isTodoOld(todo: Todo, date: string) {
  const day = date.substr(8)
  const monthAndYear = date.substr(0, 7)

  // Exact date exists or not
  if (todo.date) {
    if (todo.monthAndYear < monthAndYear) {
      return true
    }
    if (todo.monthAndYear === monthAndYear && todo.date < day) {
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
