import UIReducer, { INITIAL_STATE } from './UI.reducer'
import types from '../constants/UI.constants'

describe('REDUCER: UI', () => {
  describe('action: UI_LOAD', () => {
    it('null payload', () => {
      const action = {
        type: types.UI_LOAD,
      }
      expect(UIReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
    it('full payload', () => {
      const action = {
        type: types.UI_LOAD,
        payload: {
          config: [],
        },
      }
      expect(UIReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        verified: false,
        verificationLevel: false,
        isPaperTrading: false,
      })
    })
  })

  describe('action: UI_SET', () => {
    it('null payload', () => {
      const action = {
        type: types.UI_SET,
      }
      expect(UIReducer(INITIAL_STATE, action)).toEqual(INITIAL_STATE)
    })
    it('unknown key and section', () => {
      const action = {
        type: types.UI_SET,
        payload: {
          value: true,
        },
      }
      expect(UIReducer(INITIAL_STATE, action)).toEqual({
        ...INITIAL_STATE,
        'unknown-section': true,
      })
    })
    it('full payload', () => {
      const initialState = {
        layout: {
          isSaved: false,
        },
      }
      const action = {
        type: types.UI_SET,
        payload: {
          section: 'layout',
          value: true,
          key: 'isSaved',
        },
      }
      expect(UIReducer(initialState, action)).toEqual({
        layout: {
          isSaved: true,
        },
      })
    })
  })
})
