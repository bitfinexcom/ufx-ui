import {
  startOfMinute, setMinutes, startOfHour, setHours, startOfWeek, add, sub, startOfMonth,
} from 'date-fns'

export const toDate = (date) => (date instanceof Date ? date : new Date(date))

export function roundDate15Minutes(inputDate) {
  const date = toDate(inputDate)
  const minutes = date.getMinutes()
  return startOfMinute(setMinutes(date, minutes - (minutes % 15)))
}

export function roundDate12Hours(inputDate) {
  const date = toDate(inputDate)
  const hours = date.getHours()
  return startOfHour(setHours(date, hours - (hours % 12)))
}

export const applyUTCOffsetToDate = (date, utcOffset) => (
  add(date, { minutes: utcOffset + toDate(date).getTimezoneOffset() })
)

export const removeUTCOffsetFromDate = (date, utcOffset) => (
  sub(date, { minutes: utcOffset + toDate(date).getTimezoneOffset() })
)

export const startOfWeekUTC = (inputDate) => {
  const date = toDate(inputDate)
  const weekStart = startOfWeek(date, { weekStartsOn: 1 })
  // remove the offset so the resulting unix timestamp matches the correct UTC time
  return sub(weekStart, { minutes: weekStart.getTimezoneOffset() })
}

export const startOfMonthUTC = (inputDate) => {
  const date = toDate(inputDate)
  const monthStart = startOfMonth(date)
  // remove the offset so the resulting unix timestamp matches the correct UTC time
  return sub(monthStart, { minutes: monthStart.getTimezoneOffset() })
}

export const dateToStringUTC = (date) => `${date.toISOString().split('.')[0]}Z`

// TIF format is 'yyyy-MM-dd HH:mm:ss' in UTC   --  date-fns has no built-in way to format dates in other timezones
export const dateToTIFString = (inputDate) => {
  const date = toDate(inputDate)
  return date.toISOString().split('.')[0].replace('T', ' ')
}

export const dateToLongUtcString = (inputDate) => {
  const date = toDate(inputDate)
  return date.toLocaleString('en-GB', {
    timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
  })
}
