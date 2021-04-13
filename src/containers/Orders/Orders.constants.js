/* eslint-disable import/prefer-default-export */
import React from 'react'

import { ORDERS_KEYS as KEYS } from '../../components'
import OrderStatus from '../format/OrderStatus'

export const ROW_MAPPING = {
  [KEYS.STATUS]: {
    renderer: ({ value }) => <OrderStatus status={value} />,
  },
}
