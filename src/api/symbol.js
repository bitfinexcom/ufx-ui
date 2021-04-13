import { pubApi } from '../functions/api'

export const getSymbolDetails = () => pubApi({
  url: '/v1/symbols_details',
})

export default {
  getSymbolDetails,
}
