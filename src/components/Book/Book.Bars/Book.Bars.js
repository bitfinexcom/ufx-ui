import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { BAR_LINE_HEIGHT, BOOK_VIZ_TYPES } from '../Book.constants'
import { calculateBarData } from '../Book.helpers'
import { PROP_BOOK_TRADE } from '../Book.props'
import { bar as style } from '../Book.styles'
import Bar from './Book.Bar'

const BookBars = (props) => {
  const {
    psnap,
    totals,
    totalMax,
    amountMax,
    isBid,
    zoom,
    bookViz,
    isVertical,
  } = props

  const barDirection = isBid
    ? '-1, 1'
    : isVertical
      ? '-1, -1'
      : '1, 1'

  const bars = psnap.map((value, index) => calculateBarData({
    value,
    index,
    totals,
    totalMax,
    amountMax,
    zoom,
    bookViz,
    isBid,
  }))

  return (
    <svg style={style.svg(BAR_LINE_HEIGHT * psnap.length, barDirection)}>
      {bars.map(bar => [
        <Bar
          key={`market-${bar.index}`}
          index={bar.index}
          size={bar.size}
          color={bar.color}
        />,
      ])}
    </svg>
  )
}

BookBars.propTypes = {
  psnap: PropTypes.arrayOf(PropTypes.number),
  totals: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  totalMax: PropTypes.number,
  amountMax: PropTypes.number,
  isBid: PropTypes.bool,
  zoom: PropTypes.number.isRequired,
  bookViz: PropTypes.oneOf(Object.values(BOOK_VIZ_TYPES)).isRequired,
  isVertical: PropTypes.bool,
}

BookBars.defaultProps = {
  psnap: [],
  totals: {},
  totalMax: null,
  amountMax: null,
  isBid: false,
  isVertical: false,
}

export default memo(BookBars)
