import _isArray from 'lodash/isArray'
import _isNull from 'lodash/isNull'
import _size from 'lodash/size'

import tAdapter from '../adapters/book.adapter'
import types from '../constants/ws.constants'
import { getRawData, getSides } from './book.reducer'

const INITIAL_STATE = {
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
    // trading snapshot
    case types.BOOK_TOP_SNAPSHOT_MESSAGE: {
      const chanId = payload[0]

      return {
        chanId,
        channel,
        snapshotReceived: true,
        ...tAdapter.snapshot(payload, opts),
      }
    }

    // trading update
    case types.BOOK_TOP_UPDATE_MESSAGE: {
      const chanId = payload[0]
      if (chanId !== state.chanId) {
        return state
      }

      return {
        ...state,
        ...tAdapter.update(payload, state, opts),
      }
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
