import { logger } from '@ufx-ui/utils'
import _forEach from 'lodash/forEach'
import _get from 'lodash/get'
import _isArray from 'lodash/isArray'
import _isObject from 'lodash/isObject'
import {
  put, select, takeEvery, delay, fork, call, all,
} from 'redux-saga/effects'

import { notify } from '../actions/notifications.actions'
import {
  WSSend,
  WSSubscribed,
  WSUnsubscribed,
  resetChannelState,
  WSAuthenticated,
} from '../actions/ws.actions'
import types, { WS_EVENT_TYPES } from '../constants/ws.constants'
import {
  getWSConnected,
  getWSChannels,
  findAllMatchingChannels,
  findMatchingChannelWithSymbol,
} from '../selectors/ws.selectors'
import { wss, isHB } from './ws.saga.helpers'

const PING_INTERVAL = 30000

function* processWSMessage({ payload: actionPayload }) {
  const { event } = actionPayload
  try {
    const { data = '' } = event
    const payload = JSON.parse(data)

    // data/hb message
    if (_isArray(payload)) {
      const [chanId] = payload
      const channels = yield select(getWSChannels)
      const channel = channels[chanId]
      if (chanId !== 0 && channels[chanId] === undefined) {
        return null
      }

      if (!isHB(payload)) {
        yield put(wss(payload, channel))
      }

      return null
    }

    // info message
    if (_isObject(payload)) {
      switch (payload.event) {
        case WS_EVENT_TYPES.SUBSCRIBED: {
          yield put(WSSubscribed(payload))
          break
        }

        case WS_EVENT_TYPES.UNSUBSCRIBED: {
          yield put(WSUnsubscribed(payload))
          break
        }

        case WS_EVENT_TYPES.AUTH: {
          const { status, msg: message } = payload || {}
          if (status === 'FAILED') {
            yield put(notify({
              level: 'error',
              message,
            }))
          }
          yield put(WSAuthenticated(payload))

          break
        }

        case WS_EVENT_TYPES.ERROR: {
          return logger.error(payload)
        }

        default: {
          return null
        }
      }
    }

    return null
  } catch (e) {
    logger.error(e)
  }
  return null
}

function* unsubscibeChannel({ payload }, unsubscribeAll = false) {
  const channels = yield select(getWSChannels)
  if (unsubscribeAll) {
    const channelsToUnsubscribe = findAllMatchingChannels(channels, payload)

    const actions = []
    _forEach(channelsToUnsubscribe, (_channel) => {
      const id = _get(_channel, 'chanId')

      actions.push(put(WSSend({
        event: WS_EVENT_TYPES.UNSUBSCRIBE,
        chanId: id,
      })))
      actions.push(put(resetChannelState(_channel)))
    })
    yield all(actions)
  }

  const channel = findMatchingChannelWithSymbol(channels, payload)
  const chanId = _get(channel, 'chanId')

  if (!chanId) {
    return
  }

  yield put(resetChannelState(channel))
  yield put(WSSend({
    event: WS_EVENT_TYPES.UNSUBSCRIBE,
    chanId,
  }))
}

function* subscibeChannel({ payload }) {
  // unsubscibe if already subscibed to channel
  yield call(unsubscibeChannel, { payload })

  yield put(WSSend({
    event: WS_EVENT_TYPES.SUBSCRIBE,
    ...payload,
  }))
}

function* resubscibeChannel({ payload }, unsubscribeAll = true) {
  // unsubscibe all channels or channel matching payload
  yield call(unsubscibeChannel, { payload }, unsubscribeAll)

  yield put(WSSend({
    event: WS_EVENT_TYPES.SUBSCRIBE,
    ...payload,
  }))
}

// keeps the connection alive by sending pings periodically
export function* wsPingSaga() {
  while (true) {
    const isWSConnected = yield select(getWSConnected)
    if (isWSConnected) {
      yield put(WSSend({
        event: WS_EVENT_TYPES.PING,
      }))
    }

    yield delay(PING_INTERVAL)
  }
}

export function* WSSaga() {
  yield fork(wsPingSaga)
  yield takeEvery(types.MESSAGE, processWSMessage)
  yield takeEvery(types.SUBSCRIBE, subscibeChannel)
  yield takeEvery(types.UNSUBSCRIBE, unsubscibeChannel)
  yield takeEvery(types.RESUBSCRIBE, resubscibeChannel)
}

export default WSSaga
