export const isDevelopmentMode = process.env.NODE_ENV === 'development'

export const PLATFORM_SETTINGS = {
  AMOUNT_SIG_FIGS: 5,
  AMOUNT_DECIMALS: 8,
  PRICE_SIG_FIGS: 5,
  PRICE_DECIMALS: 4,
}

export const book = {
  UPDATE_COOLDOWN_MS: 1000, // 1 sec
  MAX_PRECISION: 4,
  MIN_ZOOM: 20,
  DEFAULT_ZOOM: 100,
  MAX_ZOOM: 200,
}
