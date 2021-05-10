/* eslint-disable camelcase */
import { api } from '../functions/api'

export const getMovements = ({ startDate, endDate, limit }) => api({
  url: '/v2/auth/r/movements/hist',
  method: 'post',
  data: {
    start: startDate,
    end: endDate,
    limit,
  },
})

export const requestGenerateInvoice = (data) => (
  api({
    url: '/v2/auth/w/deposit/invoice',
    method: 'post',
    data,
  })
)

export const requestDepositAddress = ({ wallet, method }) => api({
  url: '/v2/auth/w/deposit/address',
  method: 'post',
  data: {
    wallet,
    method,
    op_renew: 0,
  },
})

export const requestNewDepositAddress = ({ wallet, method }) => api({
  url: '/v2/auth/w/deposit/address',
  method: 'post',
  data: {
    wallet,
    method,
    op_renew: 1,
  },
})

export const requestNewWithdraw = ({
  wallet,
  method,
  amount,
  address,
  payment_id,
}) => api({
  url: '/v2/auth/w/withdraw',
  method: 'post',
  data: {
    wallet,
    method,
    amount,
    address,
    payment_id,
  },
})

export default {
  getMovements,
  requestGenerateInvoice,
  requestNewDepositAddress,
  requestNewWithdraw,
}
