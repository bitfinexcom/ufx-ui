import _isFinite from 'lodash/isFinite'

import Intent from './intent'
import { TEXT_ALIGNMENT } from './props'

const NS = 'ufx'

// modifiers
// alignment
export const ALIGN_LEFT = '--align-left'
export const ALIGN_RIGHT = '--align-right'
export const ALIGN_CENTER = '--align-center'

// size
export const SIZE_SMALL = '--small'

/* ui components - start */

// Heading
export const HEADING = `${NS}-heading`

// Label
export const LABEL = `${NS}-label`

// Menu
export const MENU = `${NS}-menu`

// Button
export const BUTTON = `${NS}-button`

// Input
export const INPUT = `${NS}-input`

// Checkbox
export const CHECKBOX = `${NS}-checkbox`

// Dropdown
export const DROPDOWN = `${NS}-dropdown`

// Tabs
export const TABS = `${NS}-tabs`

// Table
export const TABLE = `${NS}-table`
export const TABLE_INTERACTIVE = `${NS}-table--interactive`
export const TABLE_STRIPED = `${NS}-table--striped`
export const TABLE_CONDENSED = `${NS}-table--condensed`

// Modal
export const MODAL = `${NS}-modal`

// Tooltip
export const TOOLTIP = `${NS}-tooltip`

// Sortable Button
export const SORT_BUTTON = `${NS}-sort-button`

// Notifications
export const NOTIFICATIONS = `${NS}-notifications`

// Popover
export const POPOVER = `${NS}-popover`

// Notice
export const NOTICE = `${NS}-notice`

// Table Wrapper
export const TABLE_WRAPPER = `${NS}-table-wrapper`

/* ui components - end */

/* format components - start */

export const FADE_TRAILING_ZEROS = `${NS}-fade-trailing-zeros`

/* format components - end */

/* other components - start */

// Responsive
export const RESPONSIVE = `${NS}-responsive`

// Spinner
export const SPINNER = `${NS}-spinner`

// QuickSwap
export const QUICKSWAP = `${NS}-quickswap`

// MarketList
export const MARKET_LIST = `${NS}-marketlist`

// Ticker
export const TICKER = `${NS}-ticker`

// TickerList
export const TICKER_LIST = `${NS}-tickerlist`

// Trades
export const TRADES = `${NS}-trades`

// Order History
export const ORDER_HISTORY = `${NS}-order-history`

// Orders
export const ORDERS = `${NS}-orders`

// Book
export const BOOK = `${NS}-book`

// Depth chart
export const DEPTH_CHART = `${NS}-depth-chart`

// Order Form
export const ORDER_FORM = `${NS}-order-form`

// Balances
export const BALANCES = `${NS}-balances`

// Dialog
export const DIALOG = `${NS}-dialog`

// Grid
export const GRID = `${NS}-grid`

// Deposits
export const DEPOSIT_WALLETS = `${NS}-deposit-wallets`
export const MOVEMENT_LIST = `${NS}-movementlist`

/* other components - end */

/* page/containers - start */

export const TRADING = `${NS}-trading`
export const PAGE_HEADER = `${NS}-page-header`
export const PAGE_FOOTER = `${NS}-page-footer`
export const PAGE_LOWER_FOOTER = `${NS}-page-lower-footer`
export const LAYOUT = `${NS}-layout`
export const MOVEMENTS = `${NS}-movements`
export const HELP_BUTTON = `${NS}-help-button`
export const TETHER_TRANSPORT = `${NS}-tether-transport`

// Deposits
export const NEW_CRYPTO_DEPOSIT = `${NS}-new-crypto-deposit`
export const NEW_TETHER_DEPOSIT = `${NS}-new-tether-deposit`
export const NEW_INVOICE = `${NS}-new-invoice`

// Withdrawal
export const WITHDRAWAL_TERMS = `${NS}-withdrawal-terms`
export const WITHDRAWAL_FEES_EXPLAIN = `${NS}-withdrawal-fees-explain`
export const AVAILABLE_BALANCE_BOX = `${NS}-available-balance-box`
export const NEW_WITHDRAWAL = `${NS}-new-withdrawal`

/* page/containers - end */

// class helper functions

export const intentSuffix = (intent) => {
  if (intent == null || intent === Intent.NONE) {
    return undefined
  }
  return `--${intent.toLowerCase()}`
}

export const alignmentModifier = (alignment) => {
  switch (alignment) {
    case TEXT_ALIGNMENT.LEFT:
      return ALIGN_LEFT
    case TEXT_ALIGNMENT.RIGHT:
      return ALIGN_RIGHT
    case TEXT_ALIGNMENT.CENTER:
      return ALIGN_CENTER
    default:
      return ALIGN_CENTER
  }
}

export const BREAKPOINTS = {
  XXS: 320,
  XS: 380,
  S: 420,
  SM: 576,
  MD: 768,
  ML: 880,
  LG: 992,
  XL: 1200,
  HG: 1440,
}

// $screen - xxs: 320px;
// $screen - xs: 380px;
// $screen - s: 420px;
// $screen - sm: 576px;
// $screen - md: 768px;
// $screen - ml: 880px;
// $screen - lg: 992px;
// $screen - xl: 1200px;
// $screen - hg: 1440px;
export const getResponsiveClass = (width) => {
  let size
  if (width <= BREAKPOINTS.XXS) {
    size = 'xxs'
  } else if (width <= BREAKPOINTS.XS) {
    size = 'xs'
  } else if (width <= BREAKPOINTS.S) {
    size = 's'
  } else if (width <= BREAKPOINTS.SM) {
    size = 'sm'
  } else if (width <= BREAKPOINTS.MD) {
    size = 'md'
  } else if (width <= BREAKPOINTS.ML) {
    size = 'ml'
  } else if (width <= BREAKPOINTS.LG) {
    size = 'lg'
  } else if (width <= BREAKPOINTS.XL) {
    size = 'xl'
  } else if (width <= BREAKPOINTS.HG) {
    size = 'hg'
  }

  return size && `${RESPONSIVE}--${size}`
}

// _common.scss classes - start

export const SUCCESS_TEXT = `${NS}-green-text`
export const ERROR_TEXT = `${NS}-red-text`

export const getColors = (value, opts = {}) => {
  const { strike = null, includeStrike = false } = opts

  if (!_isFinite(value) || !_isFinite(strike)) {
    return ''
  }

  if (value === strike && includeStrike) {
    return SUCCESS_TEXT
  }

  return value > strike ? SUCCESS_TEXT : ERROR_TEXT
}

export const CENTER = `${NS}-center`
export const RIGHT_TO_LEFT = `${NS}-rtl`

export const DIVIDER = `${NS}-divider`

export const TEXT_MUTED = `${NS}-text-muted`

// _common.scss classes - end
