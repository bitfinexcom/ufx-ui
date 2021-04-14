import React, { memo } from 'react'

import { OrderHistory } from '../../components'
import { ResponsiveState } from '../../components/Responsive'
import withResponsive from '../../hoc/withResponsive'
import useOrders from '../../hooks/useOrders'
import { ROW_MAPPING, BREAKPOINT_SMALL } from './OrderHistory.constants'

const OrderHistoryContainer = (props) => {
  const { loading, ordersHistory: orders } = useOrders(true)

  const { width } = ResponsiveState()
  const isMobile = width < BREAKPOINT_SMALL
  return (
    <OrderHistory
      orders={orders}
      rowMapping={ROW_MAPPING}
      loading={loading}
      isMobile={isMobile}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default withResponsive(memo(OrderHistoryContainer))
