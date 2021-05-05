import { getAuthHeaders } from './api_auth'

const interceptor = (opts = {}) => (config = {}) => ({
  ...config,
  headers: {
    ...opts.headers, // axios
    ...config.headers, // custom
    ...getAuthHeaders(config), // auth
  },
})

export default interceptor
