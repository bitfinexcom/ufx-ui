export const PAIR_URL_SEPARATOR = ':'
export const PAIR_OUTPUT_SEPARATOR = '/'

export const defaultBaseCcy = process.env.REACT_APP_UFX_DEFAULT_BASE_CCY || 'BTC'
export const defaultQuoteCcy = process.env.REACT_APP_UFX_DEFAULT_BASE_CCY || 'USD'
export const defaultUrlPair = defaultBaseCcy + PAIR_URL_SEPARATOR + defaultQuoteCcy

export const defaultBaseCcyPaper = process.env.REACT_APP_UFX_DEFAULT_BASE_CCY || 'TESTBTC'
export const defaultQuoteCcyPaper = process.env.REACT_APP_UFX_DEFAULT_QUOTE_CCY || 'TESTUSD'
export const defaultUrlPairPaper = defaultBaseCcyPaper + PAIR_URL_SEPARATOR + defaultQuoteCcyPaper

export const loggerLevels = process.env.REACT_APP_UFX_LOGGER_LEVELS ? JSON.parse(process.env.REACT_APP_UFX_LOGGER_LEVELS) : ['error']
