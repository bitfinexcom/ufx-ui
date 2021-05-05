import { api } from '../functions/api'

export const getOrderHistory = (section, params) => api({
  url: `/v2/auth/r/orders/${section}hist`,
  method: 'post',
  params,
})

export default {
  getOrderHistory,
}
