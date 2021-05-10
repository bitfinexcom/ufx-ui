import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getValue } from '@ufx-ui/utils'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import { CooldownButton } from '../ui'
import Truncate from '../ui/Truncate'
import { KEYS, MAPPING, CANCEL_TIMEOUT_MS } from './Orders.constants'

const OrderRow = (props) => {
  const {
    data,
    columns,
    rowMapping: customMapping,
    cancelOrder,
  } = props
  const { t } = useTranslation('orders')

  const getDisplayValue = getValue({
    mapping: MAPPING,
    customMapping,
    data,
  })

  const id = getDisplayValue(KEYS.ID)
  const type = getDisplayValue(KEYS.TYPE)

  const amount = getDisplayValue(KEYS.AMOUNT, false)
  const isSellOrder = amount < 0
  const orderTitle = isSellOrder
    ? t('sell_order_title', { id })
    : t('buy_order_title', { id })

  const handleCancel = () => cancelOrder(id, data)

  const colorClass = Classes.getColors(amount, { strike: 0, includeStrike: true })

  const cancelButton = (
    <CooldownButton
      minimal
      onClick={handleCancel}
      timeoutMs={CANCEL_TIMEOUT_MS}
    ><FontAwesomeIcon icon={faTimes} />
    </CooldownButton>
  )

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
        const truncate = _get(customMapping, [key, 'truncate'], false)
        const content = renderer ? renderer({
          value,
          formattedValue,
          data,
          orderTitle,
          colorClass,
          isSellOrder,
          type,
          cancelButton,
        }) : formattedValue

        return (
          <td
            key={key}
            className={cellClassName}
            style={cellStyle}
          >
            {truncate ? <Truncate>{content}</Truncate> : content}
          </td>
        )
      })}
    </tr>
  )
}

OrderRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  cancelOrder: PropTypes.func.isRequired,
}

OrderRow.defaultProps = {
  data: {},
  rowMapping: {},
}

export default memo(OrderRow)
