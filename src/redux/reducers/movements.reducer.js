import _get from 'lodash/get'
import _size from 'lodash/size'

import mAdapter from '../adapters/movements.adapter'
import types from '../constants/movements.constants'

export const INITIAL_STATE = {
  movements: {},
  depositWallets: {},
  poolAddress: {},
  invoices: {},
}

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case types.REQUEST_MOVEMENTS_SUCCESS: {
      const { data } = action.payload

      const newMovements = { ...state.movements }
      data.forEach((movement) => {
        const row = mAdapter.adapter(movement)
        const id = _get(row, 'id')
        newMovements[id] = row
      })

      return {
        ...state,
        movements: newMovements,
      }
    }

    case types.REQUEST_DEPOSIT_WALLETS_SUCCESS: {
      const { currency, wallets, poolAddress } = action.payload

      const updatedPoolAddress = { ...state.poolAddress }
      if (_size(poolAddress) > 0) {
        updatedPoolAddress[currency] = poolAddress
      }

      return {
        ...state,
        depositWallets: {
          ...state.depositWallets,
          [currency]: wallets,
        },
        poolAddress: updatedPoolAddress,
      }
    }

    case types.UPDATE_INVOICE: {
      const invoice = _get(action.payload, '[4].invoice', null)

      if (!invoice) {
        return state
      }

      return {
        ...state,
        invoices: {
          ...state.invoices,
          [invoice.invoice]: invoice,
        },
      }
    }

    default:
      return state
  }
}

export default reducer
