import { pubApi } from '../functions/api'

export const getConf = (requests) => pubApi({
  url: `/v2/conf/${requests.join(',')}`,
})

export const getConversions = () => pubApi({
  url: '/v2/conf/pub:map:currency:wfx',
})

export default {
  getConf,
  getConversions,
}
