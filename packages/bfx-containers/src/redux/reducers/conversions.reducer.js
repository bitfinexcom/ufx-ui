import _isEmpty from 'lodash/isEmpty'

import adapter from '../adapters/conversions.adapter'
import types from '../constants/currencies.constants'

const INITIAL_STATE = {
  conversions: {},
}

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.REQUEST_CONVERSIONS_SUCCESS: {
      if (_isEmpty(payload)) {
        return state
      }

      const conversions = adapter(payload)

      return {
        ...state,
        conversions,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
