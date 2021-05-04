import { isDerivativeCcy } from '@ufx-ui/utils'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _mergeWith from 'lodash/mergeWith'
import _pickBy from 'lodash/pickBy'
import { createSelector } from 'reselect'

import {
  ZERO_BALANCES,
  PAPER_ZERO_BALANCES,
} from '../constants/balances.constants'
import { getUfxState } from './common'
import { getCurrencySymbolMemo } from './currencies.selectors'
import { getUIIsPaperTrading, getUITradingCurrencies } from './UI.selectors'

const EMPTY_OBJ = {}

export const getBalances = (state) => _get(getUfxState(state), 'balances', EMPTY_OBJ)

export const getBalancesWalletsRaw = (state) => getBalances(state).wallets

export const getBalancesWallets = createSelector(
  getUIIsPaperTrading,
  getBalancesWalletsRaw,
  (isPaperTrading, wallets) => {
    if (!_isEmpty(wallets)) {
      return wallets
    }
    if (isPaperTrading) {
      return PAPER_ZERO_BALANCES
    }

    return ZERO_BALANCES
  },
)

export const getBalancesSnapshotReceived = (state) => getBalances(state).snapshotReceived

export const getTradingBalanceWallets = createSelector(
  [getUITradingCurrencies, getBalancesWallets, getCurrencySymbolMemo],
  (currencies, wallets, getCurrencySymbol) => _mergeWith(
    currencies,
    _pickBy(wallets, (_, symbol) => !isDerivativeCcy(symbol)), (first, second, key) => ({
      ...first,
      ...second,
      name: getCurrencySymbol(key),
      currency: key,
    }),
  ),
)

export default {
  getBalances,
  getBalancesWallets,
  getTradingBalanceWallets,
}
