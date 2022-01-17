import { pad2, applyTimeZoneOffset } from '@ufx-ui/utils'
import PropTypes from 'prop-types'
import React from 'react'

import { useStore } from '../../store'

const Time = (props) => {
  const { mts, hideSeconds } = props
  const { timezoneOffset: offset } = useStore()

  const date = applyTimeZoneOffset(new Date(mts), offset)
  const HH = pad2(date.getHours())
  const MM = pad2(date.getMinutes())
  const SS = (hideSeconds)
    ? []
    : pad2(date.getSeconds())

  const timeParts = [HH, MM].concat(SS)

  return <span>{timeParts.join(':')}</span>
}

Time.propTypes = {
  /**
   * Timestamp in ms
   */
  mts: PropTypes.number.isRequired,
  /**
   * If true, seconds will be hidden
   */
  hideSeconds: PropTypes.bool,
}

Time.defaultProps = {
  hideSeconds: false,
}

export default Time
