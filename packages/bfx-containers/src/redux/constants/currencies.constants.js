import { createTypes } from 'redux-action-types'

export const CURRENCY_LABEL = 'label'
export const CURRENCY_SYMBOL = 'sym'
export const CURRENCY_UNIT_LABEL = 'unitLabel'
export const CURRENCY_UNIT_TOOLTIP = 'unitTooltip'
export const CURRENCY_COLLATERAL_MARGIN = 'collateralMargin'
export const CURRENCY_POOL = 'pool'
export const CURRENCY_EXPLORER = 'explorer'
export const CURRENCY_TX_METHOD = 'txMethod'

const types = createTypes(
  'ufx-core/tickers/',
  'REQUEST_CURRENCIES_INFO',
  'REQUEST_CURRENCIES_INFO_SUCCESS',
  'REQUEST_SYMBOL_DETAILS',
  'REQUEST_SYMBOL_DETAILS_SUCCESS',
  'REQUEST_CONVERSIONS',
  'REQUEST_CONVERSIONS_SUCCESS',
)

export default types
