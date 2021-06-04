import { api } from '../functions/api'

export const bootstrap = () => api({
  url: '',
  method: 'post',
})

export default {
  bootstrap,
}
