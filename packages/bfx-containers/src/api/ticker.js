import { pubApi } from '../functions/api'

export const getList = (symbols = 'ALL') => pubApi({
  url: '/v2/tickers',
  params: {
    symbols,
  },
})

export default {
  getList,
}
