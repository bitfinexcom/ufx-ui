import Big from 'bignumber.js'
import _get from 'lodash/get'
import _last from 'lodash/last'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../common/props'
import { KEYS } from './Book.constants'
import { PROP_BOOK_TRADE } from './Book.props'

const getMaxTotal = (totalArr, priceArr) => Math.abs(_get(totalArr, [_last(priceArr), 'total'], 0))

const Spread = (props) => {
  const {
    tBids, tAsks, pBids, pAsks, decimals, columns, rowMapping: customMapping,
  } = props

  const askTotal = getMaxTotal(tAsks, pAsks)
  const bidTotal = getMaxTotal(tBids, pBids)
  const total = new Big(askTotal).plus(bidTotal).toString()
  const minAsk = _get(pAsks, '0', 0)
  const maxBid = _get(pBids, '0', 0)
  const spread = new Big(minAsk).minus(maxBid).toString()

  return (
    <div className='spread'>
      <div className='row'>
        {columns.map(({
          dataKey,
          cellClassName,
          cellStyle,
          renderer: defRenderer,
        }) => {
          const renderer = _get(customMapping, [dataKey, 'renderer'], defRenderer)

          return (
            <div
              key={dataKey}
              className={cellClassName}
              style={cellStyle}
            >
              {renderer && (dataKey === KEYS.TOTAL || dataKey === KEYS.PRICE) ? renderer({
                value: dataKey === KEYS.TOTAL ? total : spread,
                decimals,
                total,
              }) : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Spread.propTypes = {
  tAsks: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  tBids: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape(PROP_BOOK_TRADE), PropTypes.number])),
  pAsks: PropTypes.arrayOf(PropTypes.number),
  pBids: PropTypes.arrayOf(PropTypes.number),
  decimals: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)).isRequired,
}

Spread.defaultProps = {
  tAsks: {},
  tBids: {},
  pAsks: [],
  pBids: [],
}

export default memo(Spread)
