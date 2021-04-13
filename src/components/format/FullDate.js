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
  ts: PropTypes.number,
  mts: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

FullDate.defaultProps = {
  ts: 0,
  mts: 0,
  style: null,
}

export default FullDate
