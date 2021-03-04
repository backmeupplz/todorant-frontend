export function getDateWithStartTimeOfDay(
  startTimeOfDay: string = '00:00',
  date: Date = new Date()
) {
  const today = new Date(date)
  const now = new Date(date)
  today.setHours(parseInt(startTimeOfDay.substr(0, 2)))
  today.setMinutes(parseInt(startTimeOfDay.substr(3)))

  if (now < today) {
    const yesterday = new Date(date)
    yesterday.setDate(new Date(yesterday).getDate() - 1)
    return yesterday
  }
  return now
}
