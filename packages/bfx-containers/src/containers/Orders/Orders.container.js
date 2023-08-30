import { Orders } from '@ufx-ui/core'
import React, { memo } from 'react'

import { ROW_MAPPING } from './Orders.constants'
import useOrders from '../../hooks/useOrders'

const OrdersContainer = (props) => {
  const { loading, orders, cancelOrder } = useOrders()

  return (
    <Orders
      orders={orders}
      loading={loading}
      cancelOrder={cancelOrder}
      rowMapping={ROW_MAPPING}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default memo(OrdersContainer)
