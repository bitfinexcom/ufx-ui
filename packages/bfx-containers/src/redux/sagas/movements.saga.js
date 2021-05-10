import { i18n } from '@ufx-ui/core'
import { push } from 'connected-react-router'
import _get from 'lodash/get'
import {
  all, spawn, put, takeEvery, takeLatest,
} from 'redux-saga/effects'

import {
  getMovements,
  requestNewWithdraw as requestNewWithdrawApi,
  requestDepositAddress,
} from '../../api/movements'
import { MOVEMENT_TYPES } from '../../utils/movements'
import { notifySuccess, notifyError } from '../actions/notifications.actions'
import types from '../constants/movements.constants'

function* fetchMovements(action) {
  const {
    startDate, endDate, limit,
  } = action.payload

  try {
    const res = yield getMovements({
      startDate,
      endDate,
      limit,
    })

    yield put({
      type: types.REQUEST_MOVEMENTS_SUCCESS,
      payload: {
        data: res.data,
      },
    })
  } catch (error) {
    yield put(
      notifyError(_get(error, 'response.data.message', error.message)),
    )
  }
}

function* watchRequestMovements() {
  yield takeEvery(types.REQUEST_MOVEMENTS, fetchMovements)
}

function* requestDepositWallets(action) {
  const { wallets, method, currency } = action.payload
  try {
    let poolAddress
    // eslint-disable-next-line func-names
    const responses = yield all(wallets.map(function* (wallet) {
      const res = yield requestDepositAddress({ wallet, method })
      const address = _get(res, ['data', 4, 4])
      poolAddress = _get(res, ['data', 4, 5])

      return { name: wallet, address }
    }))

    const payload = { wallets: responses, currency, poolAddress }
    yield put({
      type: types.REQUEST_DEPOSIT_WALLETS_SUCCESS,
      payload,
    })
  } catch (e) {
    const error = e.message

    let data
    if (error === 'create: failed') {
      data = wallets.map(wallet => ({ name: wallet, address: 'none generated' }))
    } else {
      data = wallets.map(wallet => ({ name: wallet, address: i18n.t('deposits:error_get_address') }))
    }

    yield put({
      type: types.REQUEST_DEPOSIT_WALLETS_SUCCESS,
      payload: { wallets: data, currency },
    })

    yield put(notifyError(_get(e, 'response.data.message', error)))
  }
}

function* requestNewWithdraw(action) {
  const requestPayload = action.payload
  try {
    const res = yield requestNewWithdrawApi(requestPayload)

    const status = _get(res, ['data', 6])
    // https://docs.bitfinex.com/reference#rest-auth-withdraw
    // withdrawalId is "0" if the withdrawal was unsuccessful
    const withdrawalId = _get(res, ['data', 4, 0])

    if (status === 'SUCCESS' && withdrawalId !== 0) {
      yield put(notifySuccess(i18n.t('withdrawals:withdraw_success')))
      yield put(push(`/${MOVEMENT_TYPES.WITHDRAWALS}`))
    } else {
      const message = _get(res, ['data', 7])
      yield put(notifyError(message))
    }
  } catch (e) {
    yield put(notifyError(_get(e, 'response.data.message', e.message)))
  }
}

export default function* movementsSaga() {
  yield spawn(watchRequestMovements)
  yield takeLatest(types.REQUEST_DEPOSIT_WALLETS, requestDepositWallets)
  yield takeLatest(types.REQUEST_NEW_WITHDRAW, requestNewWithdraw)
}
