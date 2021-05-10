import _isArray from 'lodash/isArray'
import _isNull from 'lodash/isNull'
import _keys from 'lodash/keys'
import _size from 'lodash/size'
import _toString from 'lodash/toString'

import tAdapter from '../adapters/book.adapter'
import types from '../constants/ws.constants'

const INITIAL_STATE = {}

export const getSides = (row, isBid) => (isBid(row)
  ? { side: 'bids', other: 'asks' }
  : { side: 'asks', other: 'bids' })

// original payload: [chanID, [ ...rawdata ] ]
export const getRawData = (payload = {}) => (_isArray(payload[1])
  ? payload[1]
  : payload.slice(1))

const opts = { getRawData, getSides }

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { payload = [], channel = {} } = action

  if (_isNull(payload)) {
    return state
  }

  // action creators fail to recognize empty snapshots
  const isEmptySnapshot = (
    (_isArray(payload[1]) && _size(payload[1]) === 0) && action.type === types.BOOK_UPDATE_MESSAGE
  )
  const type = (isEmptySnapshot)
    ? types.BOOK_SNAPSHOT_MESSAGE
    : action.type

  switch (type) {
    // trading snapshot
    case types.BOOK_SNAPSHOT_MESSAGE: {
      const chanId = payload[0]

      return {
        ...state,
        [chanId]: {
          channel,
          snapshotReceived: true,
          ...tAdapter.snapshot(payload, opts),
        },
      }
    }

    // trading update
    case types.BOOK_UPDATE_MESSAGE: {
      const chanId = payload[0]

      // return if there is no snapshot state for the channel
      const allChanIds = _keys(state)
      if (!allChanIds.includes(_toString(chanId))) {
        return state
      }

      const prevState = state[chanId]

      return {
        ...state,
        [chanId]: {
          ...prevState,
          ...tAdapter.update(payload, prevState, opts),
        },
      }
    }

    case types.BOOK_RESET_MESSAGE: {
      return INITIAL_STATE
    }

    default: {
      return state
    }
  }
}

export default reducer
