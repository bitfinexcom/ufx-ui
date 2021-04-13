import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../common/props'
import { getValue } from '../../utils/data-mapping'
import { KEYS } from './Trades.constants'
import { getOpacityPercentage } from './Trades.helpers'

const BASE_OPACITY = 0.05
const MAX_OPACITY = 0.2
const color = {
  red: '224, 61, 84', // $intent-error #e03d54
  green: '33, 187, 139', // $intent-success #21bb8b
}

const TradeRow = (props) => {
  const {
    data,
    rowMapping: customMapping,
    columns,
    minOrderSize,
  } = props

  const getDisplayValue = getValue({
    customMapping,
    data,
  })

  const amount = getDisplayValue(KEYS.AMOUNT)

  const perc = getOpacityPercentage({ amount, min: minOrderSize })
  const isBuy = (amount > 0)
  const opacity = (MAX_OPACITY * perc) + BASE_OPACITY
  const style = {
    background: `rgba(${isBuy ? color.green : color.red}, ${opacity})`,
  }

  return (
    <tr style={style}>
      {columns.map(({
        key,
        cellClassName,
        cellStyle,
        renderer: defRenderer,
      }) => {
        const formattedValue = getDisplayValue(key)
        const value = getDisplayValue(key, false)
        const renderer = _get(customMapping, [key, 'renderer'], defRenderer)

        return (
          <td
            key={key}
            className={cellClassName}
            style={cellStyle}
          >
            {renderer ? renderer({
              value,
              formattedValue,
              data,
              isBuy,
            }) : formattedValue}
          </td>
        )
      })}
    </tr>
  )
}

TradeRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  minOrderSize: PropTypes.number.isRequired,
}

TradeRow.defaultProps = {
  data: {},
  rowMapping: {},
}

export default memo(TradeRow)
