import { Intent } from '@ufx-ui/core'

import types from '../constants/notifications.constants'

let lastItemCID = Date.now()

export const notify = (args = {}) => {
  const {
    level,
    message,
    mts = null,
    cid = null,
  } = args

  if (!cid) {
    lastItemCID += 1
  }

  return {
    type: types.NOTIFY,
    payload: {
      level,
      message,
      mts: mts || new Date().getTime(),
      cid: cid || lastItemCID,
    },
  }
}

export const notifySuccess = (message) => notify({
  message,
  level: Intent.SUCCESS,
})

export const notifyInfo = (message) => notify({
  message,
  level: Intent.INFO,
})

export const notifyWarning = (message) => notify({
  message,
  level: Intent.WARNING,
})

export const notifyError = (message) => notify({
  message,
  level: Intent.ERROR,
})
