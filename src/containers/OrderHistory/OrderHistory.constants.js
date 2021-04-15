/* eslint-disable import/prefer-default-export */
import _get from 'lodash/get'
import React from 'react'

import { ORDER_HISTORY_COLUMNS } from '../../components'
import OrderStatus from '../format/OrderStatus'
import OrderAmount from './OrderHistory.Amount'

export const ROW_MAPPING = {
  [ORDER_HISTORY_COLUMNS.AMOUNT]: {
    format: (value, _, data) => (
      <OrderAmount amount={value} originalAmount={_get(data, 'originalAmount')} />
    ),
  },
  [ORDER_HISTORY_COLUMNS.STATUS]: {
    renderer: ({ value }) => <OrderStatus status={value} />,
  },
}
