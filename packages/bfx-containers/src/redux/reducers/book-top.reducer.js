import _isArray from 'lodash/isArray'
import _isNull from 'lodash/isNull'
import _keys from 'lodash/keys'
import _omit from 'lodash/omit'
import _size from 'lodash/size'
import _toString from 'lodash/toString'

import { getRawData, getSides } from './book.reducer'
import tAdapter from '../adapters/book.adapter'
import types from '../constants/ws.constants'

export const INITIAL_STATE = {
  asks: {},
  bids: {},
  pasks: [],
  pbids: [],
  snapshotReceived: false,
  chanId: undefined,
}

const opts = { getRawData, getSides, isBookTop: true }

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { payload = [], channel = {} } = action

  if (_isNull(payload)) {
    return state
  }

  // action creators fail to recognize empty snapshots
  const isEmptySnapshot = (
    (_isArray(payload[1]) && _size(payload[1]) === 0)
    && (action.type === types.BOOK_TOP_SNAPSHOT_MESSAGE)
  )
  const type = (isEmptySnapshot)
    ? types.BOOK_TOP_SNAPSHOT_MESSAGE
    : action.type

  switch (type) {
    // book-top snapshot and update
    case types.BOOK_TOP_SNAPSHOT_MESSAGE:
    case types.BOOK_TOP_UPDATE_MESSAGE: {
      const chanId = payload[0]

      // book-top snapshot
      if (!state?.[chanId]?.snapshotReceived) {
        return {
          ...state,
          [chanId]: {
            channel,
            snapshotReceived: true,
            ...tAdapter.snapshot(payload, opts),
          },
        }
      }

      /* book-top update logic start */
      // return if there is no snapshot state for the channel
      const allChanIds = _keys(state)
      if (!allChanIds.includes(_toString(chanId))) {
        return state
      }

      const prevState = state[chanId]
      const newState = tAdapter.update(payload, prevState, opts)

      return {
        ...state,
        [chanId]: {
          ...prevState,
          ...newState,
        },
      }

      /* book-top update logic end */
    }

    case types.UNSUBSCRIBED: {
      if (_isNull(payload)) {
        return state
      }
      const { chanId, status } = payload
      if (status !== 'OK') {
        return state
      }

      return _omit(state, [chanId])
    }

    case types.BOOK_TOP_RESET_MESSAGE: {
      return INITIAL_STATE
    }

    default: {
      return state
    }
  }
}

export default reducer
