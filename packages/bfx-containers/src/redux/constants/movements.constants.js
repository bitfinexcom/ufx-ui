import { createTypes } from 'redux-action-types'

export const MOVEMENTS_REDUCER_SAGA_KEY = 'movements'

const types = createTypes(
  'ufx-core/movements/',
  'REQUEST_MOVEMENTS',
  'REQUEST_MOVEMENTS_SUCCESS',
  'UPDATE_INVOICE',
  'REQUEST_NEW_WITHDRAW',
  'REQUEST_DEPOSIT_WALLETS',
  'REQUEST_DEPOSIT_WALLETS_SUCCESS',
)

export default types
