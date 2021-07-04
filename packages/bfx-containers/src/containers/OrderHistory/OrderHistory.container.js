import { OrderHistory, withMobileLayout, withResponsive } from '@ufx-ui/core'
import compose from 'lodash/fp/compose'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import useOrders from '../../hooks/useOrders'
import { getMapping } from './OrderHistory.constants'

const OrderHistoryContainer = (props) => {
  const { loading, ordersHistory: orders } = useOrders(true)
  const { t } = useTranslation('orderhistory')
  const { isMobileLayout } = props
  const mapping = useMemo(() => getMapping(t, isMobileLayout), [isMobileLayout, t])

  return (
    <OrderHistory
      orders={orders}
      rowMapping={mapping}
      loading={loading}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default compose(
  withResponsive,
  withMobileLayout(),
  memo,
)(OrderHistoryContainer)
