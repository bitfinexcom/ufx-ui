import types from '../constants/notifications.constants'

const INITIAL_STATE = []

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { payload = {} } = action
  switch (action.type) {
    case types.NOTIFY: {
      return state.slice(0, 100).concat(payload)
    }

    default: {
      return state
    }
  }
}

export default reducer
