import _isNull from 'lodash/isNull'
import _omit from 'lodash/omit'

import types from '../constants/UI.constants'

const INITIAL_STATE = {}

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
      const userSettings = config.user_settings || {}

      return {
        ...state,
        ..._omit(config, 'user_settings'),
        ...userSettings,
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
