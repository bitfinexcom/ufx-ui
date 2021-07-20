export const BOOK_REDUCER_SAGA_KEY = 'book'
export const BOOK_TOP_REDUCER_SAGA_KEY = 'bookTop'

const FREQUENCY = {
  F0: 'F0', // Realtime
  F1: 'F1', // 2 seconds
}

export const SUBSCRIPTION_CONFIG = {
  channel: 'book',
  freq: FREQUENCY.F0,
  len: '25',
}

export const BOOK_TOP_SUBSCRIPTION_CONFIG = {
  channel: 'book',
  freq: FREQUENCY.F0,
  len: '100',
}
