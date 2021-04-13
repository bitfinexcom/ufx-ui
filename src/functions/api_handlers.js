import _get from 'lodash/get'
import _isArray from 'lodash/isArray'
import _isEmpty from 'lodash/isEmpty'

import { i18n } from '../i18n'
import { notifyError } from '../redux/actions/notifications.actions'
import errorAdapter from '../redux/adapters/error.adapter'
import logger from './logger'

const HTTP_STATUS = {
  RATE_LIMIT: 429,
}

export const createErrorHandler = (store) => (
  (err) => {
    logger.error(err)

    const requestStatus = _get(err, 'request.status')
    if (requestStatus === HTTP_STATUS.RATE_LIMIT) {
      const dispatch = _get(store, 'dispatch')
      if (dispatch) {
        dispatch(notifyError(i18n.t('http_errors:rate_limit')))
      }
    }

    // error should be the response from API
    const responseError = _get(err, 'response.data')
    if (!_isEmpty(responseError) && _isArray(responseError)) {
      const error = errorAdapter(responseError)
      return Promise.reject(error)
    }
    return Promise.reject(err)
  }
)

export default {
  createErrorHandler,
}
