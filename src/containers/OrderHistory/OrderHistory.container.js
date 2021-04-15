import React, { memo } from 'react'

import { OrderHistory } from '../../components'
import withResponsive from '../../hoc/withResponsive'
import useOrders from '../../hooks/useOrders'
import { ROW_MAPPING } from './OrderHistory.constants'

const OrderHistoryContainer = (props) => {
  const { loading, ordersHistory: orders } = useOrders(true)

  return (
    <OrderHistory
      orders={orders}
      rowMapping={ROW_MAPPING}
      loading={loading}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default withResponsive(memo(OrderHistoryContainer))
