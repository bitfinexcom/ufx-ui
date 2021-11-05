import types from '../constants/layouts.constants'

export const INITIAL_STATE = {
  editEnabled: false,
}

const reducer = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case types.EDIT_ENABLE: {
      return {
        ...state,
        editEnabled: true,
      }
    }

    case types.EDIT_CLOSE: {
      return {
        ...state,
        editEnabled: false,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
