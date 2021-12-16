import _isNull from 'lodash/isNull'

import types from '../constants/UI.constants'

export const INITIAL_STATE = {}

const IS_VERIFIED_INDEX = 4
const VERIFICATION_LEVEL_INDEX = 5
const IS_PAPER_TRADING_INDEX = 21

const UIReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case types.UI_LOAD: {
      if (_isNull(payload)) {
        return state
      }
      const {
        config = {},
      } = payload
      const verified = config?.[IS_VERIFIED_INDEX]
      const verificationLevel = config?.[VERIFICATION_LEVEL_INDEX]
      const isPaperTrading = config?.[IS_PAPER_TRADING_INDEX]

      return {
        ...state,
        verified,
        verificationLevel,
        isPaperTrading,
      }
    }

    case types.UI_SET: {
      if (_isNull(payload)) {
        return state
      }
      const {
        value,
        section = 'unknown-section',
        key = 'unknown-key',
      } = payload
      let v = value

      if (key !== 'unknown-key') {
        v = state[section] || {}
        v[key] = value
      }

      return {
        ...state,
        [section]: v,
      }
    }

    default: {
      return state
    }
  }
}

export default UIReducer
