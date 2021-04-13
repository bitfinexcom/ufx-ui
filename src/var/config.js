export const isDevelopmentMode = process.env.NODE_ENV === 'development'

export const PLATFORM_SETTINGS = {
  AMOUNT_SIG_FIGS: 5,
  AMOUNT_DECIMALS: 8,
  PRICE_SIG_FIGS: 5,
  PRICE_DECIMALS: 4,
}

export const TICKER_INTERVAL = 12000 // 12 seconds

export const book = {
  UPDATE_COOLDOWN_MS: 1000, // 1 sec
  MAX_PRECISION: 4,
  MIN_ZOOM: 20,
  DEFAULT_ZOOM: 100,
  MAX_ZOOM: 200,
}

export const depthChart = {
  MIN_ZOOM: 25,
  DEFAULT_ZOOM: 50,
  MAX_ZOOM: 100,
}

export const orderHistory = {
  REQUEST_SIZE: 250,
}

export const notifications = {
  DEFAULT_TIMEOUT_MS: 6000, // 6 seconds
  REFRESH_NOTIFICATIONS: 1000, // 1 second
  SKIPPED_NOTIFICATIONS: [
    'oc-req',
    'ou-req',
    'on-req',
    'fon-req',
  ],
}

export const ORDER_TOTAL_MAX_DECIMALS = 8

export const BFX_URL = 'https://www.bitfinex.com'
