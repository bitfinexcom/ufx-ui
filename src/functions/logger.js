import _includes from 'lodash/includes'

import { loggerLevels } from './config.selectors'

const LOGGER_LEVEL = {
  LOG: 'log',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
}

export default {
  log(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.LOG)) {
      // eslint-disable-next-line no-console
      console.log(...args)
    }
  },

  debug(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.DEBUG)) {
      // eslint-disable-next-line no-console
      console.debug(...args)
    }
  },

  info(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.INFO)) {
      // eslint-disable-next-line no-console
      console.info(...args)
    }
  },

  warn(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.WARN)) {
      // eslint-disable-next-line no-console
      console.warn(...args)
    }
  },

  error(...args) {
    if (_includes(loggerLevels, LOGGER_LEVEL.ERROR)) {
      // eslint-disable-next-line no-console
      console.error(...args)
    }
  },
}
