import _get from 'lodash/get'
import _values from 'lodash/values'
import { createSelector } from 'reselect'

import { getUfxState } from './common'

const EMPTY_OBJ = {}

const getOrders = (state) => _get(getUfxState(state), 'orders', EMPTY_OBJ)

const getAllOrdersState = (state) => getOrders(state).all

const getAllOrdersHistMap = (state) => getOrders(state).hist_all

const sortByDate = (a, b) => b.placed - a.placed

export const getHistoryOrders = createSelector(
  getAllOrdersHistMap,
  (orders) => _values(orders).sort(sortByDate),
)

export const getAllOrders = createSelector(
  getAllOrdersState,
  (orders) => _values(orders).sort(sortByDate),
)

export default {
  getAllOrders,
  getHistoryOrders,
}
