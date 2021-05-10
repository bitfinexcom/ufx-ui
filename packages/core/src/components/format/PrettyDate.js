import { applyTimeZoneOffset } from '@ufx-ui/utils'
import _isFinite from 'lodash/isFinite'
import PropTypes from 'prop-types'
import React from 'react'

import { useStore } from '../../store'

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday',
]
const MONTH_NAMES = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]
const SUFFIX = {
  1: 'st',
  2: 'nd',
  3: 'rd',
}

// Return OrdinalNumber in string format from an integer value input
export const numberToRank = (value) => {
  if (!_isFinite(value) || value === 0) {
    return 'N/A'
  }
  // from https://www.easypacelearning.com/all-lessons/learning-english-level-1/97-ordinal-numbers-ranking-english-lesson
  // exception: 11, 12, 13 end in -th
  if (value > 10 && value < 14) {
    return `${value}th`
  }
  // other numbers use -st -nd -rd based on unit value
  const unit = value
    .toString()
    .split('')
    .pop()
  const suffix = SUFFIX[unit] || 'th'

  return `${value}${suffix}`
}

const PrettyDate = (props) => {
  const {
    mts,
    showDay,
    showYear,
    abbreviate,
    monthDayOnly,
  } = props

  const { timezoneOffset: offset } = useStore()
  const date = applyTimeZoneOffset(new Date(mts), offset)
  const day = DAY_NAMES[date.getDay()]
  const m = MONTH_NAMES[date.getMonth()]
  const month = abbreviate
    ? m && m.substr(0, 3)
    : m
  const dayNumber = numberToRank(date.getDate())

  const now = new Date()
  const yy = date.getFullYear()
  const year = (yy !== now.getFullYear()) || showYear
    ? yy
    : ''

  if (monthDayOnly) {
    return (
      `${month} ${date.getDate()}`
    )
  }

  return (
    <>
      {showDay
        ? `${day}, ${month} ${dayNumber} ${year}`
        : `${month} ${dayNumber} ${year}`}
    </>
  )
}

PrettyDate.propTypes = {
  mts: PropTypes.number.isRequired,
  showDay: PropTypes.bool,
  showYear: PropTypes.bool,
  abbreviate: PropTypes.bool,
  monthDayOnly: PropTypes.bool,
}

PrettyDate.defaultProps = {
  showDay: true,
  showYear: false,
  abbreviate: false,
  monthDayOnly: false,
}

export default PrettyDate
