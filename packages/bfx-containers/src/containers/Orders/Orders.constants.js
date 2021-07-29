/* eslint-disable import/prefer-default-export */
import { ORDERS_KEYS as KEYS } from '@ufx-ui/core'
import React from 'react'

import OrderStatus from '../format/OrderStatus'

export const ROW_MAPPING = {
  [KEYS.STATUS]: {
    renderer: ({ cellData }) => <OrderStatus status={cellData} />,
  },
}
