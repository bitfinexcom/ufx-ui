import movementsReducer, { INITIAL_STATE } from './movements.reducer'
import types from '../constants/movements.constants'

describe('REDUCER: movements', () => {
  const initialState = {
    ...INITIAL_STATE,
    movements: {
      14000005: {
        id: 14000005,
        currency: 'BTC',
        mts_start: 1574175052000,
        mts_update: 1574181326000,
        status: 'OK',
        amount: -0.5,
        fees: -0.00135,
        destination_address: 'DESTINATION_ADDRESS',
        txId: 'TRANSACTION_ID',
      },
    },
    depositWallets: {
      ETH: { name: 'ETH', address: 'ETH_ADDRESS' },
    },
    poolAddress: { ETH: 'ETH_POOLADDRESS' },
    invoices: {
      20000: { invoice: 20000 },
    },
  }
  describe('action: REQUEST_MOVEMENTS_SUCCESS', () => {
    it('full payload', () => {
      const action = {
        type: types.REQUEST_MOVEMENTS_SUCCESS,
        payload: {
          data: [
            [
              13293039,
              'ETH',
              'ETHEREUM',
              null,
              null,
              1574175052000,
              1574181326000,
              null,
              null,
              'CANCELED',
              null,
              null,
              -0.24,
              -0.00135,
              null,
              null,
              'DESTINATION_ADDRESS',
              null,
              null,
              null,
              'TRANSACTION_ID',
              'Purchase of 100 pizzas',
            ],
          ],
        },
      }
      expect(movementsReducer(initialState, action)).toEqual({
        ...initialState,
        movements: {
          ...initialState.movements,
          13293039: {
            id: 13293039,
            currency: 'ETH',
            mts_start: 1574175052000,
            mts_update: 1574181326000,
            status: 'CANCELED',
            amount: -0.24,
            fees: -0.00135,
            destination_address: 'DESTINATION_ADDRESS',
            txId: 'TRANSACTION_ID',
          },
        },
      })
    })
  })
  describe('action: REQUEST_DEPOSIT_WALLETS_SUCCESS', () => {
    it('full payload', () => {
      const action = {
        type: types.REQUEST_DEPOSIT_WALLETS_SUCCESS,
        payload: {
          currency: 'BTC',
          wallets: { name: 'BTC', address: 'ADDRESS' },
          poolAddress: 'YOURADDRESS',
        },
      }
      expect(movementsReducer(initialState, action)).toEqual({
        ...initialState,
        depositWallets: {
          ...initialState.depositWallets,
          BTC: { name: 'BTC', address: 'ADDRESS' },
        },
        poolAddress: {
          ...initialState.poolAddress,
          BTC: 'YOURADDRESS',
        },
      })
    })
  })
  describe('action: UPDATE_INVOICE', () => {
    it('full payload', () => {
      const action = {
        type: types.UPDATE_INVOICE,
        payload: [null, null, null, null, { invoice: { invoice: 20005 } }],
      }
      expect(movementsReducer(initialState, action)).toEqual({
        ...initialState,
        invoices: {
          ...initialState.invoices,
          20005: { invoice: 20005 },
        },
      })
    })
  })
})
