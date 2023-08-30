import _first from 'lodash/first'
import _get from 'lodash/get'
import _last from 'lodash/last'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'
import { createSelector } from 'reselect'

import { getTotals } from './book.selectors'
import { getUfxState } from './common'
import { getWSChannels, findMatchingChannelWithSymbol } from './ws.selectors'
import { BOOK_TOP_SUBSCRIPTION_CONFIG } from '../constants/book.constants'

const EMPTY_OBJ = {}

export const getBookTop = (state) => _get(getUfxState(state), 'bookTop', EMPTY_OBJ)

export const getBookTopChannel = createSelector(
  [
    getWSChannels,
    (_, symbol) => symbol,
  ],
  (wsChannels, symbol) => findMatchingChannelWithSymbol(wsChannels, {
    ...BOOK_TOP_SUBSCRIPTION_CONFIG,
    symbol,
  }),
)

export const getBookTopForSymbol = createSelector(
  [
    getBookTop,
    getBookTopChannel,
  ],
  (book, bookChannel) => {
    const chanId = _get(bookChannel, 'chanId')

    return _get(book, [chanId], EMPTY_OBJ)
  },
)

export const getBookTopAsks = createSelector(
  getBookTopForSymbol,
  (book) => _get(book, 'asks'),
)

export const getBookTopBids = createSelector(
  getBookTopForSymbol,
  (book) => _get(book, 'bids'),
)

export const getBookTopPasks = createSelector(
  [getBookTopAsks],
  (asks) => {
    const askPrices = _map(asks, (ask) => ask.price)
    return _orderBy(askPrices, null, 'asc')
  },
)

export const getBookTopPbids = createSelector(
  [getBookTopBids],
  (bids) => {
    const bidPrices = _map(bids, (bid) => bid.price)
    return _orderBy(bidPrices, null, 'asc')
  },
)

export const getBookTopAsk = createSelector(
  getBookTopPasks,
  (asks) => Number(_first(asks)) || undefined,
)

export const getBookTopBid = createSelector(
  getBookTopPbids,
  (bids) => Number(_last(bids)) || undefined,
)

export const getBookTopTasks = createSelector(
  getBookTopAsks,
  getBookTopPasks,
  (asks, pasks) => getTotals(asks, pasks),
)

export const getBookTopTbids = createSelector(
  getBookTopBids,
  getBookTopPbids,
  (bids, pbids) => getTotals(bids, _orderBy(pbids, null, 'desc')),
)

export default {
  getBookTopAsks,
  getBookTopBids,
  getBookTopPasks,
  getBookTopPbids,
  getBookTopAsk,
  getBookTopBid,
  getBookTopTasks,
  getBookTopTbids,
}
