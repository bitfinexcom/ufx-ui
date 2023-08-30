import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import { createSelector } from 'reselect'

import { getUfxState } from './common'
import { getWSChannels, findMatchingChannelWithSymbol } from './ws.selectors'
import { SUBSCRIPTION_CONFIG } from '../constants/book.constants'

const EMPTY_OBJ = {}

const getBook = (state) => _get(getUfxState(state), 'book', EMPTY_OBJ)

export const getBookChannel = createSelector(
  [
    getWSChannels,
    (_, symbol) => symbol,
  ],
  (wsChannels, symbol) => findMatchingChannelWithSymbol(wsChannels, {
    ...SUBSCRIPTION_CONFIG,
    symbol,
  }),
)

export const getBookForSymbol = createSelector(
  [
    getBook,
    getBookChannel,
  ],
  (book, bookChannel) => {
    const chanId = _get(bookChannel, 'chanId')

    return _get(book, [chanId], EMPTY_OBJ)
  },
)

export const isSubscribedToBook = createSelector(
  getBookChannel,
  (bookChannel) => !_isEmpty(bookChannel),
)

export const getBookSnapshotReceived = createSelector(
  getBookForSymbol,
  (book) => _get(book, 'snapshotReceived'),
)

export const getBookAsks = createSelector(
  getBookForSymbol,
  (book) => _get(book, 'asks'),
)

export const getBookBids = createSelector(
  getBookForSymbol,
  (book) => _get(book, 'bids'),
)

export const getBookpAsks = createSelector(
  getBookAsks,
  (asks) => {
    const askPrices = _map(asks, (ask) => ask.price)
    return _orderBy(askPrices, null, 'asc')
  },
)

export const getBookpBids = createSelector(
  getBookBids,
  (bids) => {
    const bidPrices = _map(bids, (bid) => bid.price)
    return _orderBy(bidPrices, null, 'asc')
  },
)

export const getBookpBidsDesc = createSelector(
  getBookBids,
  (bids) => {
    const bidPrices = _map(bids, (bid) => bid.price)
    return _orderBy(bidPrices, null, 'desc')
  },
)

export const getTotals = (bookValues, priceArr) => priceArr.reduce(
  (acc, price) => {
    const amount = _get(bookValues, [price, 'amount'], 0)
    const total = acc.total + amount

    return {
      ...acc,
      total,
      [price]: {
        total,
        amount,
      },
    }
  },
  { total: 0 },
)

export const getBooktAsks = createSelector(
  getBookAsks,
  getBookpAsks,
  (asks, pasks) => getTotals(asks, pasks),
)

export const getBooktBids = createSelector(
  getBookBids,
  getBookpBids,
  (bids, pbids) => getTotals(bids, _orderBy(pbids, null, 'desc')),
)
