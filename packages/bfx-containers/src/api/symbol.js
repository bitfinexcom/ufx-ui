import { api } from '../functions/api'

export const getSymbolDetails = () => api({
  url: '/v1/symbols_details',
})

export default {
  getSymbolDetails,
}
