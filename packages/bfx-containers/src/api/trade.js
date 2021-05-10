import { api } from '../functions/api'

export const getAuthTradesHistory = (symbol) => api({
  url: `/v2/auth/r/trades/${symbol}/hist`,
  method: 'post',
})

export default {
  getAuthTradesHistory,
}
