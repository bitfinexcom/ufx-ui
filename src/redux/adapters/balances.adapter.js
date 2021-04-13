import _get from 'lodash/get'
import _set from 'lodash/set'

import { keys, table, walletMap } from '../constants/balances.constants'

export const isExchangeWallet = type => type === 'exchange'

const balancesAdapter = (data = [], state = {}) => {
  const combined = {}
  const ccy = data[table.currency]
  const oldWalletName = data[table.type]
  const wallet = walletMap[oldWalletName]
  const total = data[table.balance]
  let available = data[table.available]

  if (total === 0) {
    available = 0
  } else if (available === null) {
    const oldAvailable = _get(
      state,
      [keys.WALLETS, ccy, wallet, keys.AVAILABLE],
    )
    available = oldAvailable || total
  }
  _set(combined, [ccy, wallet], {
    total,
    available,
  })
  return combined
}

export const snapshot = (rawData = [], state = {}) => {
  const data = {}
  rawData.forEach((row = []) => {
    const [walletType, ccy = '?'] = row
    // store only exchange balance
    if (!isExchangeWallet(walletType)) {
      return
    }
    const combined = balancesAdapter(row, state)
    if (data[ccy]) {
      combined[ccy] = { ...data[ccy], ...combined[ccy] }
    }
    Object.assign(data, combined)
  })
  return data
}

export default balancesAdapter
