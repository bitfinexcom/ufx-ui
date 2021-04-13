import React, { useCallback, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { PROP_DEFAULT_CCYS } from '../../common/props'
import { Book } from '../../components'
import useCommonBfxData from '../../hooks/useCommonBfxData'
import useOrders from '../../hooks/useOrders'
import { set } from '../../redux/actions/UI.actions'
import { WSResubscribeChannel } from '../../redux/actions/ws.actions'
import { SUBSCRIPTION_CONFIG } from '../../redux/constants/book.constants'
import { LAST_PRICE_REQ } from '../../redux/constants/UI.constants'
import {
  getBookAsks,
  getBookBids,
  getBookpAsks,
  getBookpBidsDesc,
  getBooktAsks,
  getBooktBids,
  getBookSnapshotReceived,
} from '../../redux/selectors/book.selectors'
import { getUIBookPrec, getUIBookZoom } from '../../redux/selectors/UI.selectors'

const BookContainer = (props) => {
  const {
    baseCcy,
    quoteCcy,
    ...rest
  } = props
  const { orders, cancelOrder } = useOrders()

  const {
    isWSConnected,
    symbol,
    dispatch,
  } = useCommonBfxData(baseCcy, quoteCcy)

  const snapshotReceived = useSelector(state => getBookSnapshotReceived(state, symbol))
  const asks = useSelector(state => getBookAsks(state, symbol))
  const bids = useSelector(state => getBookBids(state, symbol))
  const pAsks = useSelector(state => getBookpAsks(state, symbol))
  const pBids = useSelector(state => getBookpBidsDesc(state, symbol))
  const tAsks = useSelector(state => getBooktAsks(state, symbol))
  const tBids = useSelector(state => getBooktBids(state, symbol))

  const prec = useSelector(getUIBookPrec)
  const zoom = useSelector(getUIBookZoom)

  const onRowClick = useCallback(
    (price) => {
      dispatch(set({
        section: 'orderform',
        key: LAST_PRICE_REQ,
        value: price,
      }))
    },
    [dispatch],
  )

  // resubscribe book channel on symbol/prec change
  useEffect(() => {
    if (isWSConnected && symbol) {
      dispatch(WSResubscribeChannel({
        ...SUBSCRIPTION_CONFIG,
        prec: `P${prec}`,
        symbol,
      }))
    }
  }, [isWSConnected, symbol, prec, dispatch])

  return (
    <Book
      prec={prec}
      zoom={zoom}
      online={isWSConnected}
      asks={asks}
      bids={bids}
      pAsks={pAsks}
      pBids={pBids}
      tAsks={tAsks}
      tBids={tBids}
      loading={!snapshotReceived}
      onRowClick={onRowClick}
      cancelOrder={cancelOrder}
      orders={orders}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  )
}

BookContainer.propTypes = PROP_DEFAULT_CCYS.props

BookContainer.defaultProps = PROP_DEFAULT_CCYS.defaults

export default memo(BookContainer)
