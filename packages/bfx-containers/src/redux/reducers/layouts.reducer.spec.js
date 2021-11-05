import types from '../constants/layouts.constants'
import layoutReducer, { INITIAL_STATE } from './layouts.reducer'

describe('REDUCER: layouts', () => {
  it('action: EDIT_ENABLE', () => {
    const action = {
      type: types.EDIT_ENABLE,
    }
    expect(layoutReducer(INITIAL_STATE, action)).toEqual({
      ...INITIAL_STATE,
      editEnabled: true,
    })
  })
  it('action: EDIT_CLOSE', () => {
    const action = {
      type: types.EDIT_CLOSE,
    }
    const initialState = {
      ...INITIAL_STATE,
      editEnabled: true,
    }
    expect(layoutReducer(initialState, action)).toEqual({
      ...INITIAL_STATE,
      editEnabled: false,
    })
  })
})
