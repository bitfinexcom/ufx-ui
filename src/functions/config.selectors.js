import { PAIR_URL_SEPARATOR } from '../redux/constants/UI.constants'

export const defaultBaseCcy = process.env.REACT_APP_UFX_DEFAULT_BASE_CCY || 'BTC'
export const defaultQuoteCcy = process.env.REACT_APP_UFX_DEFAULT_BASE_CCY || 'USD'
export const defaultUrlPair = defaultBaseCcy + PAIR_URL_SEPARATOR + defaultQuoteCcy

export const defaultBaseCcyPaper = process.env.REACT_APP_UFX_DEFAULT_BASE_CCY || 'TESTBTC'
export const defaultQuoteCcyPaper = process.env.REACT_APP_UFX_DEFAULT_QUOTE_CCY || 'TESTUSD'
export const defaultUrlPairPaper = defaultBaseCcyPaper + PAIR_URL_SEPARATOR + defaultQuoteCcyPaper

export const apiUrl = process.env.REACT_APP_UFX_PUBLIC_API_URL || 'api.bitfinex.com'

export const wssUrl = process.env.REACT_APP_UFX_WSS_URL || 'wss://api-pub.bitfinex.com/ws/2'

export const corsProxyUrl = process.env.REACT_APP_UFX_CORS_PROXY_URL || ''

export const loggerLevels = process.env.REACT_APP_UFX_LOGGER_LEVELS ? JSON.parse(process.env.REACT_APP_UFX_LOGGER_LEVELS) : ['error']

export const apiKey = process.env.REACT_APP_UFX_API_KEY || ''
export const apiSecret = process.env.REACT_APP_UFX_API_SECRET || ''
