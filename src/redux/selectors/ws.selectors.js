import _find from 'lodash/find'
import _findKey from 'lodash/findKey'
import _get from 'lodash/get'
import _matches from 'lodash/matches'
import { createSelector } from 'reselect'

import { getUfxState } from './common'

const EMPTY_OBJ = {}
const EMPTY_ARR = []

const getReducer = (state) => _get(getUfxState(state), 'ws', EMPTY_OBJ)

export const getWSConnected = (state) => getReducer(state).connected

export const getWSReconnectRetries = (state) => getReducer(state).reconnectRetries

export const getWSChannels = (state) => getReducer(state).channels || EMPTY_ARR

export const getWSChannel = createSelector(
  getWSChannels,
  (channels) => chanId => channels[chanId] || EMPTY_OBJ,
)

export const getWSChanIdFromName = createSelector(
  getWSChannels,
  (channels) => channelName => _findKey(channels, ['channel', channelName]),
)

const getWSAuthChannel = createSelector(
  getWSChannels,
  (wsChannels) => wsChannels[0],
)

export const getWSIsAuthenticated = createSelector(
  getWSAuthChannel, (authChannel) => (authChannel || EMPTY_OBJ).status === 'OK',
)

export const findMatchingChannel = (channels, source) => {
  const compareWith = {
    symbol: source.symbol, // symbol: tBTCUSD
    channel: source.channel, // channel-name: book, trades
    ...(source.len && { len: source.len }), // compare length because book and book-top has same name 'book' and differs by length, TODO: can we rename book(len=100) to book-top ?
  }

  return _find(channels, _matches(compareWith))
}

export default {
  getWSConnected,
  getWSReconnectRetries,
  getWSChannels,
  getWSChannel,
  getWSChanIdFromName,
  getWSIsAuthenticated,
}
