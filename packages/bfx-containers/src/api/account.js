import { api } from '../functions/api'

export const bootstrap = () => api({
  url: '/v2/auth/r/info/user',
  method: 'post',
})

export default {
  bootstrap,
}
