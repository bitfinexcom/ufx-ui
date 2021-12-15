/* eslint-disable */
import { put, call, takeLatest } from 'redux-saga/effects'

import { bootstrap } from '../../api/account'
import { logger } from '@ufx-ui/utils'
import { loadSettings } from '../actions/UI.actions'
import types from '../constants/bootstrap.constants'

function* processBootstrap() {
  try {
    const res = yield call(bootstrap)
    const { data } = res

    yield put(loadSettings(data))
  } catch (err) {
    logger.error(err)
  }
}

function* bootstrapSaga() {
  yield takeLatest(types.REQUEST_UI_BOOTSTRAP_DATA, processBootstrap)
}

export default bootstrapSaga
