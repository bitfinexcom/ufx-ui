import _get from 'lodash/get'
import _values from 'lodash/values'
import { createSelector } from 'reselect'

import { getUfxState } from './common'

const EMPTY_OBJ = {}
const EMPTY_ARR = []

const getReducer = (state) => _get(getUfxState(state), 'movements', EMPTY_OBJ)
const getMovementsState = (state) => getReducer(state).movements
const getDepositWalletsState = (state) => getReducer(state).depositWallets || EMPTY_OBJ
const getPoolAddressState = (state) => getReducer(state).poolAddress || EMPTY_OBJ

export const getMovements = createSelector(
  getMovementsState,
  (movements) => _values(movements).reverse(),
)

export const getDepositWallets = createSelector(
  [
    getDepositWalletsState,
    (_, symbol) => symbol,
  ],
  (wallets, symbol) => _get(wallets, [symbol], EMPTY_ARR),
)

export const getPoolAddress = createSelector(
  [
    getPoolAddressState,
    (_, symbol) => symbol,
  ],
  (poolAddress, symbol) => _get(poolAddress, [symbol]),
)

export const getUiInvoices = (state) => (
  _get(getReducer(state), 'invoices', EMPTY_OBJ)
)

export default {
  getMovements,
  getUiInvoices,
}
