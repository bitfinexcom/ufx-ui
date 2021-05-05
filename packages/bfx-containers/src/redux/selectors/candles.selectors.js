import _get from 'lodash/get'

import { getUfxState } from './common'

const EMPTY_OBJ = {}

const getReducer = (state) => _get(getUfxState(state), 'candles', EMPTY_OBJ)

export const getCandles = (state, symbolKey) => getReducer(state)[symbolKey] || null

export default {
  getCandles,
}
