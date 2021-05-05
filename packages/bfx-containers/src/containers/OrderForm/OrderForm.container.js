import { PROP_DEFAULT_CCYS, OrderForm, ORDER_TYPES } from '@ufx-ui/core'
import { PLATFORM_SETTINGS } from '@ufx-ui/utils'
import _toString from 'lodash/toString'
import React, {
  forwardRef, memo, useCallback, useEffect,
} from 'react'
import { useSelector } from 'react-redux'
import { useInjectSaga } from 'redux-injectors'

import useCommonBfxData from '../../hooks/useCommonBfxData'
import { notifyError } from '../../redux/actions/notifications.actions'
import { submitOrder as submitOrderAction } from '../../redux/actions/orders.actions'
import { WSResubscribeChannel } from '../../redux/actions/ws.actions'
import { SUBSCRIPTION_CONFIG } from '../../redux/constants/book.constants'
import { ORDERS_REDUCER_SAGA_KEY, ORDERS_NOTIF_REDUCER_SAGA_KEY } from '../../redux/constants/orders.constants'
import ordersNotifSaga from '../../redux/sagas/orderNotifications.saga'
import ordersSaga from '../../redux/sagas/orders.saga'
import { getBookTopAsk, getBookTopBid } from '../../redux/selectors/book-top.selectors'
import { getCurrencySymbol } from '../../redux/selectors/currencies.selectors'
import { getUIOrderformPrice } from '../../redux/selectors/UI.selectors'
import { getFlags, validate } from './OrderForm.helpers'

const { AMOUNT_DECIMALS } = PLATFORM_SETTINGS

const OrderFormContainer = forwardRef((props, ref) => {
  const {
    baseCcy,
    quoteCcy,
  } = props
  useInjectSaga({ key: ORDERS_REDUCER_SAGA_KEY, saga: ordersSaga })
  useInjectSaga({ key: ORDERS_NOTIF_REDUCER_SAGA_KEY, saga: ordersNotifSaga })

  const {
    isWSConnected,
    isAuthenticated,
    symbol,
    dispatch,
  } = useCommonBfxData(baseCcy, quoteCcy)

  const topAsk = useSelector(getBookTopAsk)
  const topBid = useSelector(getBookTopBid)
  const getCcySymbol = useSelector(getCurrencySymbol)
  const lastPriceReq = useSelector(getUIOrderformPrice)

  // subscribe book top ask/bid
  useEffect(() => {
    if (isWSConnected) {
      dispatch(WSResubscribeChannel({
        ...SUBSCRIPTION_CONFIG,
        len: '100',
        symbol,
      }))
    }
  }, [dispatch, symbol, isWSConnected])

  const submitOrder = useCallback(
    (data) => {
      const {
        price,
        amount,
        isBuy,
        postOnly,
        orderType: type,
      } = data || {}

      const validationErrors = validate(data, topAsk, topBid)
      if (validationErrors.length) {
        return validationErrors.forEach(err => dispatch(notifyError(err)))
      }

      const flags = getFlags({ postOnly })
      const coeff = isBuy ? 1 : -1

      const orderPrice = (type === ORDER_TYPES.EXCHANGE_MARKET)
        ? 0
        : Number(price)

      const orderAmount = Number((coeff * amount).toFixed(AMOUNT_DECIMALS))
      const order = {
        type,
        flags,
        symbol,
        amount: _toString(orderAmount),
        price: _toString(orderPrice),
      }

      return dispatch(submitOrderAction(order))
    },
    [dispatch, symbol, topAsk, topBid],
  )

  return (
    <OrderForm
      disabled={!isAuthenticated}
      topAsk={topAsk}
      topBid={topBid}
      lastPriceReq={lastPriceReq}
      submitOrder={submitOrder}
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      baseCcy={getCcySymbol(baseCcy)}
      quoteCcy={getCcySymbol(quoteCcy)}
    />
  )
})

OrderFormContainer.propTypes = PROP_DEFAULT_CCYS.props

OrderFormContainer.defaultProps = PROP_DEFAULT_CCYS.defaults

OrderFormContainer.displayName = 'OrderFormContainer'

export default memo(OrderFormContainer)
