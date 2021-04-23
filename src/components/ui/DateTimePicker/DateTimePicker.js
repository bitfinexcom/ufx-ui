/* eslint-disable react/forbid-prop-types */
import cx from 'classnames'
import { parse } from 'date-fns'
import _uniqueId from 'lodash/uniqueId'
import PropTypes from 'prop-types'
import React, { useMemo, useCallback, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import NumberFormat from 'react-number-format'

import * as Classes from '../../../common/classes'
import * as Props from '../../../common/props'
import Label from '../Label'
import { DATE_FORMAT_OPTIONS } from './DateTimePicker.constants'
import { isValidDate, toDate, calculateMinMaxTime } from './DateTimePicker.helpers'

const { TEXT_ALIGNMENT } = Props

// eslint-disable-next-line prefer-arrow-callback
export const DateTimePicker = forwardRef(function DateTimePicker(props, ref) {
  const {
    label,
    value,
    name,
    className,
    alignText,
    small,
    timeIntervals,
    minDate,
    maxDate,
    maxTime: maxTimeProp,
    minTime: minTimeProp,
    popperPlacement,
    onChange,
    disabled,
    id,
    onBlur,
    userDateFormat,
    error,
    ...rest
  } = props

  const {
    DATE_FORMAT, INPUT_MASK, INPUT_FORMAT,
  } = DATE_FORMAT_OPTIONS[userDateFormat]

  const key = useMemo(() => id || _uniqueId(), [id])

  const handleChange = useCallback(
    (date) => {
      if (!isValidDate(date, value)) {
        return
      }
      // seconds selection is not supported, so ensure seconds are "00"
      date.setSeconds(0)
      onChange(date)
    },
    [onChange, value],
  )

  const handleDatePickerChange = useCallback((date) => {
    if (!date) {
      onChange(null)
      return
    }

    handleChange(date)
  }, [handleChange, onChange])

  const handleTextInputChange = useCallback(({ formattedValue }) => {
    handleChange(parse(formattedValue, DATE_FORMAT, 0))
  }, [DATE_FORMAT, handleChange])

  const date = value && toDate(value)

  const { maxTime, minTime } = useMemo(() => calculateMinMaxTime({
    date,
    maxTime: maxTimeProp,
    minTime: minTimeProp,
    minDate,
    maxDate,
  }), [maxTimeProp, minTimeProp, minDate, date, maxDate])

  const isError = !!error

  return (
    <div
      ref={ref}
      className={cx(Classes.INPUT, className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {
      label && (
        <Label
          label={label}
          small={small}
          tag='div'
        />
      )
    }
      <div className={cx('input-field-container', { disabled, 'has-error': isError })} disabled={disabled}>
        <DatePicker
          className={cx(
            'input-field',
            `input-field${Classes.alignmentModifier(alignText)}`, {
              [`input-field${Classes.SIZE_SMALL}`]: small,
            },
          )}
          key={key}
          popperPlacement={popperPlacement}
          popperModifiers={{
            flip: {
              behavior: ['bottom'],
            },
            preventOverflow: {
              enabled: false,
            },
            hide: {
              enabled: false,
            },
          }}
          name={name}
          selected={date}
          onChange={handleDatePickerChange}
          onBlur={onBlur}
          dateFormat={DATE_FORMAT}
          showTimeSelect
          shouldCloseOnSelect={false}
          timeIntervals={timeIntervals}
          minDate={minDate}
          maxDate={maxDate}
          maxTime={maxTime}
          minTime={minTime}
          popperClassName='ufx-react-datepicker-popper'
          disabled={disabled}
          autoComplete='off'
          customInput={(
            <NumberFormat
              format={INPUT_FORMAT}
              placeholder={DATE_FORMAT}
              onValueChange={handleTextInputChange}
              mask={INPUT_MASK}
            />
          )}
        />
      </div>
      <div className={cx('error-msg', { visible: isError })}>
        {error}
      </div>
    </div>
  )
})

DateTimePicker.propTypes = {
  /**
   * The ID of the DateTimePicker.
   */
  id: PropTypes.string,
  /**
   * The name attribute of the DateTimePicker.
   */
  name: PropTypes.string,
  /**
   * The value of the DateTimePicker.
   */
  value: PropTypes.object,
  /**
   * The label text of the DateTimePicker.
   */
  label: PropTypes.node,
  /**
   * The className of the DateTimePicker.
   */
  className: PropTypes.string,
  /**
   * If true, set the DateTimePicker to the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * The function called when the DateTimePicker state changes to blur.
   */
  onBlur: PropTypes.func,
  /**
   * The function called when the DateTimePicker state changes.
   */
  onChange: PropTypes.func,
  /**
   * The error text of the DateTimePicker.
   */
  error: PropTypes.string,
  /**
   * The alignment of the DateTimePicker text.
   */
  alignText: PropTypes.oneOf(Object.values(TEXT_ALIGNMENT)),
  /**
   * If true, shows the DateTimePicker in a small style.
   */
  small: PropTypes.bool,
  /**
   * The time intervals of the DateTimePicker.
   */
  timeIntervals: PropTypes.number,
  /**
   * The minimum settable date of the DateTimePicker.
   */
  minDate: PropTypes.instanceOf(Date),
  /**
   * The maximum settable date of the DateTimePicker.
   */
  maxDate: PropTypes.instanceOf(Date),
  /**
   * The minimum settable time of the DateTimePicker.
   */
  minTime: PropTypes.instanceOf(Date),
  /**
   * The maximum settable time of the DateTimePicker.
   */
  maxTime: PropTypes.instanceOf(Date),
  /**
   * The date format of the DateTimePicker.
   */
  userDateFormat: PropTypes.oneOf([
    'DD-MM-YY HH:mm:ss',
    'MM-DD-YY HH:mm:ss',
    'YY-MM-DD HH:mm:ss',
  ]),
  /**
   * The placement of the DateTimePicker popper element.
   */
  popperPlacement: PropTypes.string,
}

DateTimePicker.defaultProps = {
  value: null,
  id: null,
  name: null,
  label: '',
  className: null,
  disabled: false,
  onChange: () => { },
  onBlur: () => { },
  timeIntervals: 15,
  popperPlacement: 'bottom-start',
  error: null,
  alignText: TEXT_ALIGNMENT.LEFT,
  small: false,
  minDate: null,
  maxDate: null,
  maxTime: null,
  minTime: null,
  userDateFormat: 'DD-MM-YY HH:mm:ss',
}

export default React.memo(DateTimePicker)
