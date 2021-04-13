import React, { memo } from 'react'

import { Orders } from '../../components'
import useOrders from '../../hooks/useOrders'
import { ROW_MAPPING } from './Orders.constants'

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
