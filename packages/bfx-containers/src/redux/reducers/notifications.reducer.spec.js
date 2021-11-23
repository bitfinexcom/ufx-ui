import types from '../constants/notifications.constants'
import notificationsReducer from './notifications.reducer'

describe('REDUCER: notifications', () => {
  describe('action: NOTIFY', () => {
    const action = {
      type: types.NOTIFY,
      payload: {
        level: 'success',
        message: 'Websocket connected',
        mts: 1636384561994,
        cid: 1636384561410,
      },
    }
    it('if state has more than 100 notifications', () => {
      const initialState = []
      for (let i = 0; i < 101; i += 1) {
        const messageObj = {
          level: 'success',
          message: 'Websocket connected',
          mts: i,
          cid: i,
        }
        initialState.push(messageObj)
      }
      const expectedState = [...initialState]
      expectedState[100] = {
        level: 'success',
        message: 'Websocket connected',
        mts: 1636384561994,
        cid: 1636384561410,
      }
      expect(notificationsReducer(initialState, action)).toEqual(expectedState)
    })
    it('if state is empty', () => {
      expect(notificationsReducer([], action)).toEqual([{
        level: 'success',
        message: 'Websocket connected',
        mts: 1636384561994,
        cid: 1636384561410,
      }])
    })
  })
})
