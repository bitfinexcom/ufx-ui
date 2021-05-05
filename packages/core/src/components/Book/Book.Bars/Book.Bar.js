import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { BAR_LINE_HEIGHT } from '../Book.constants'

const Bar = (props) => {
  const {
    index,
    size,
    color,
    height,
    xOffset,
  } = props

  return (
    <rect
      key={`bar-market-${index}`}
      x={xOffset}
      y={index * height}
      width='100%'
      transform={`scale(${size} 1)`}
      height={height}
      fillOpacity='0.2'
      className={color}
    />
  )
}

Bar.propTypes = {
  index: PropTypes.number.isRequired,
  size: PropTypes.number,
  color: PropTypes.string.isRequired,
  height: PropTypes.number,
  xOffset: PropTypes.number,
}

Bar.defaultProps = {
  size: 0,
  height: BAR_LINE_HEIGHT,
  xOffset: 1,
}

export default memo(Bar)
