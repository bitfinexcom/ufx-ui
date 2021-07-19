/* eslint-disable import/prefer-default-export */
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ORDER_HISTORY_KEYS, Tooltip, Classes } from '@ufx-ui/core'
import _get from 'lodash/get'
import React from 'react'

import OrderStatus from '../format/OrderStatus'
import OrderAmount from './OrderHistory.Amount'

export const getMapping = (t, isMobile) => ({
  [ORDER_HISTORY_KEYS.ID]: {
    renderer: ({ rowData }) => {
      const { id, originalAmount } = rowData

      const isSellOrder = originalAmount < 0
      const orderTitle = isSellOrder
        ? t('sell_order_title', { id })
        : t('buy_order_title', { id })

      const colorClass = Classes.getColors(originalAmount, { strike: 0, includeStrike: true })

      if (isMobile) {
        return <span className={isSellOrder ? 'sell' : 'buy'} />
      }

      return (
        <Tooltip content={orderTitle} persistent>
          <FontAwesomeIcon
            icon={faCircle}
            className={colorClass}
            size='sm'
          />
        </Tooltip>
      )
    },
  },
  [ORDER_HISTORY_KEYS.AMOUNT]: {
    format: (value, _, data) => (
      <OrderAmount amount={value} originalAmount={_get(data, 'originalAmount')} />
    ),
  },
  [ORDER_HISTORY_KEYS.STATUS]: {
    renderer: ({ cellData }) => <OrderStatus status={cellData} />,
  },
})
