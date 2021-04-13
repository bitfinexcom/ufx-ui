import types from '../constants/movements.constants'

export const requestMovements = ({
  startDate = undefined,
  endDate = undefined,
  limit = 20,
} = {}) => ({
  type: types.REQUEST_MOVEMENTS,
  payload: {
    startDate,
    endDate,
    limit,
  },
})

export const requestDepositWallets = ({ method, wallets, currency }) => ({
  type: types.REQUEST_DEPOSIT_WALLETS,
  payload: {
    method,
    wallets,
    currency,
  },
})

export const requestNewWithdraw = ({
  wallet,
  method,
  amount,
  address,
  // eslint-disable-next-line camelcase
  payment_id,
}) => ({
  type: types.REQUEST_NEW_WITHDRAW,
  payload: {
    wallet,
    method,
    amount,
    address,
    payment_id,
  },
})

export const updateUiInvoice = (notification) => ({
  type: types.UPDATE_INVOICE,
  payload: {
    notification,
  },
})
