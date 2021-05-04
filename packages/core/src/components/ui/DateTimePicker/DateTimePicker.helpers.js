import {
  isValid,
  isSameMinute,
  isSameDay,
  endOfDay,
  startOfDay,
} from 'date-fns'

export const toDate = (date) => (date instanceof Date ? date : new Date(date))

export const calculateMinMaxTime = ({
  date,
  minTime,
  maxTime,
  minDate,
  maxDate,
}) => {
  if (minTime && maxTime) {
    return {
      minTime,
      maxTime,
    }
  }
  if (!minDate) {
    return {}
  }

  const isSameDayAsMinDate = !date || isSameDay(date, minDate)
  if (isSameDayAsMinDate) {
    return {
      minTime: minDate,
      maxTime: endOfDay(minDate),
    }
  }
  const isSameDayAsMaxDate = maxDate && isSameDay(date, maxDate)
  if (isSameDayAsMaxDate) {
    return {
      minTime: startOfDay(maxDate),
      maxTime: maxDate,
    }
  }
  return {}
}

export const isValidDate = (date, value) => (isValid(date) || !isSameMinute(date, value))
