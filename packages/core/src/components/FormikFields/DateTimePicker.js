/* eslint-disable react/forbid-prop-types */
import {
  isValid, sub, add, addDays, endOfDay, startOfDay,
} from 'date-fns'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { useStore } from '../../store'
import { DateTimePicker as UIDateTimePicker } from '../ui'

const toDate = (date) => (date instanceof Date ? date : new Date(date))

const removeUTCOffsetFromDate = (date, utcOffset) => (
  sub(date, { minutes: utcOffset + toDate(date).getTimezoneOffset() })
)
const applyUTCOffsetToDate = (date, utcOffset) => (
  add(date, { minutes: utcOffset + toDate(date).getTimezoneOffset() })
)

const DateTimePicker = (props) => {
  const {
    minDays,
    maxDays,
    field: {
      name, value, onBlur, onChange,
    },
    form: { touched, errors },
    fieldsToValidate,
    ...rest
  } = props

  const { timeFormat, timezoneOffset } = useStore()

  let error = (touched[name] && errors[name])
  if (!error && fieldsToValidate) {
    const errorField = fieldsToValidate.find(f => touched[f])
    error = errorField && errors[errorField]
  }

  const errorMessage = error || ''

  const today = new Date()
  const minDate = startOfDay(addDays(today, minDays))
  const maxDate = addDays(today, maxDays)
  const maxTime = endOfDay(maxDate)
  const minTime = minDate

  const handleChange = (date) => {
    // saves time in UTC format
    const dateInUtc = removeUTCOffsetFromDate(toDate(date), timezoneOffset)
    // we need to mimic a standard js event for Formik to pick this up
    const e = {
      target: {
        value: isValid(dateInUtc) ? dateInUtc.toISOString() : '',
        name,
      },
    }

    onChange(e)
  }

  // applies user timezone (from settings) for display purposes
  const dateWithTzOffset = applyUTCOffsetToDate(value ? toDate(value) : null, timezoneOffset)

  return (
    <UIDateTimePicker
      value={isValid(dateWithTzOffset) ? dateWithTzOffset : null}
      name={name}
      minDate={minDate}
      maxDate={maxDate}
      onChange={handleChange}
      onBlur={onBlur}
      error={errorMessage}
      userDateFormat={timeFormat}
      maxTime={maxTime}
      minTime={minTime}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

DateTimePicker.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  minHours: PropTypes.number,
  maxDays: PropTypes.number,
}

DateTimePicker.defaultProps = {
  minHours: null,
  maxDays: null,
}

export default memo(DateTimePicker)
