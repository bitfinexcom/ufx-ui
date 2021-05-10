import _isUndefined from 'lodash/isUndefined'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import { cancelOrder as cancelOrderAction, fetchOrderHistory } from '../redux/actions/orders.actions'
import { ORDERS_REDUCER_SAGA_KEY } from '../redux/constants/orders.constants'
import ordersSaga from '../redux/sagas/orders.saga'
import { getAllOrders, getHistoryOrders } from '../redux/selectors/orders.selectors'
import { getWSIsAuthenticated } from '../redux/selectors/ws.selectors'
import { orderHistory as config } from '../var/config'

const useOrders = (fetchOrdersHistoryFlag = false) => {
  useInjectSaga({ key: ORDERS_REDUCER_SAGA_KEY, saga: ordersSaga })

  const isAuthenticated = useSelector(getWSIsAuthenticated)
  const ordersHistory = useSelector(getHistoryOrders)
  const orders = useSelector(getAllOrders)
  const loading = isAuthenticated && (_isUndefined(orders) || _isUndefined(ordersHistory))

  const dispatch = useDispatch()
  const cancelOrder = useCallback(
    (id) => dispatch(cancelOrderAction(id)),
    [dispatch],
  )

  useEffect(() => {
    if (isAuthenticated && fetchOrdersHistoryFlag) {
      dispatch(fetchOrderHistory({
        params: { limit: config.REQUEST_SIZE },
      }))
    }
  }, [dispatch, isAuthenticated, fetchOrdersHistoryFlag])

  return {
    loading,
    ordersHistory,
    orders,
    cancelOrder,
  }
}

export default useOrders
