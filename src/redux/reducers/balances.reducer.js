import _isEmpty from 'lodash/isEmpty'
import _isNull from 'lodash/isNull'

import adapter, { snapshot, isExchangeWallet } from '../adapters/balances.adapter'
import { table } from '../constants/balances.constants'
import types from '../constants/ws.constants'

export const INITIAL_STATE = {
  wallets: {},
  snapshotReceived: false,
}

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload = [] } = action

  switch (type) {
    case types.WS_MESSAGE: {
      if (_isNull(payload)) {
        return state
      }

      const [, , rawData] = payload
      let data = null
      if (rawData.length === 0) {
        data = {}
      } else {
        data = snapshot(rawData, state)
      }

      return {
        ...state,
        wallets: {
          ...data,
        },
        snapshotReceived: true,
      }
    }

    case types.WU_MESSAGE: {
      if (_isNull(payload)) {
        return state
      }
      const [, , rawData] = payload

      if (_isEmpty(rawData)) {
        return state
      }

      // store only exchange balance
      const [walletType] = rawData
      if (!isExchangeWallet(walletType)) {
        return state
      }

      const data = adapter(rawData, state)
      const ccy = rawData[table.currency]

      if (state.wallets[ccy]) {
        data[ccy] = { ...state.wallets[ccy], ...data[ccy] }
      }
      return {
        ...state,
        wallets: {
          ...state.wallets,
          ...data,
        },
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
