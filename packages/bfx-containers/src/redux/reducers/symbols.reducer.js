import _isEmpty from 'lodash/isEmpty'
import _isNull from 'lodash/isNull'

import detailAdapter from '../adapters/symbols.adapter'
import types from '../constants/currencies.constants'

export const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.REQUEST_SYMBOL_DETAILS_SUCCESS: {
      if (_isNull(payload) || _isEmpty(payload)) {
        return state
      }

      return detailAdapter(payload)
    }

    default: {
      return state
    }
  }
}

export default reducer
