export const keys = {
  WALLETS: 'wallets',
  AVAILABLE: 'available',
  TOTAL: 'total',
}

export const table = {
  type: 0,
  currency: 1,
  balance: 2,
  interest: 3,
  available: 4,
}

export const walletMap = {
  exchange: 'exchange',
}

const balance = () => ({
  total: 0,
  available: 0,
})

const wallet = () => ({
  exchange: balance(),
})

export const ZERO_BALANCES = {
  USD: wallet(),
  BTC: wallet(),
}

export const PAPER_ZERO_BALANCES = {
  TESTUSD: wallet(),
  TESTBTC: wallet(),
}

export const BALANCES_REDUCER_SAGA_KEY = 'balances'
