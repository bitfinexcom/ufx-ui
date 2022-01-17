import PropTypes from 'prop-types'
import React from 'react'

import DateComponent from './Date'
import Time from './Time'

const FullDate = (props) => {
  const { ts, mts, style } = props

  const t = (mts)
    ? mts / 1000
    : ts

  return (
    <span style={style}>
      <DateComponent mts={t} />
      {' '}
      <Time mts={t} />
    </span>
  )
}

FullDate.propTypes = {
  /**
   * Timestamp in sec. Using if mts prop isn't exist
   */
  ts: PropTypes.number,
  /**
   * Timestamp in ms
   */
  mts: PropTypes.number,
  /**
   * Styles object of FullDate container
   */
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

FullDate.defaultProps = {
  ts: 0,
  mts: 0,
  style: null,
}

export default FullDate
