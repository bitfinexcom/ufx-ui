import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import { getValue } from '../../utils/data-mapping'
import { KEYS, MAPPING } from './OrderHistory.constants'

const OrderHRow = (props) => {
  const {
    data,
    columns,
    rowMapping: customMapping,
  } = props
  const { t } = useTranslation('orderhistory')

  const getDisplayValue = getValue({
    mapping: MAPPING,
    customMapping,
    data,
  })

  const type = getDisplayValue(KEYS.TYPE)
  const baseCcy = getDisplayValue(KEYS.BASE_CCY)
  const quoteCcy = getDisplayValue(KEYS.QUOTE_CCY)
  const originalAmount = getDisplayValue(KEYS.ORGINIAL_AMOUNT)
  const id = getDisplayValue(KEYS.ID)

  const isSellOrder = (originalAmount < 0)
  const orderTitle = isSellOrder
    ? t('sell_order_title', { id })
    : t('buy_order_title', { id })

  const colorClass = Classes.getColors(originalAmount, { strike: 0, includeStrike: true })

  return (
    <tr className='row'>
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
              orderTitle,
              colorClass,
              isSellOrder,
              type,
              baseCcy,
              quoteCcy,
            }) : formattedValue}
          </td>
        )
      })}
    </tr>
  )
}

OrderHRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
}

OrderHRow.defaultProps = {
  data: {},
  rowMapping: {},
}

export default memo(OrderHRow)
