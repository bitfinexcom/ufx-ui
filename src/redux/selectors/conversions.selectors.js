import _get from 'lodash/get'
import _pickBy from 'lodash/pickBy'
import { createSelector } from 'reselect'

import { getUfxState } from './common'
import { getIsPaperCcy } from './currencies.selectors'
import { getUIIsPaperTrading } from './UI.selectors'

const EMPTY_OBJ = {}

const getConversionsState = (state) => _get(getUfxState(state), 'conversions', EMPTY_OBJ)

export const getConversions = createSelector(
  [getConversionsState, getUIIsPaperTrading, getIsPaperCcy],
  (conversionsState, isPaperTrading, isPaperCcy) => {
    const { conversions } = conversionsState
    return _pickBy(conversions, (value, key) => (
      isPaperTrading ? isPaperCcy(key) : !isPaperCcy(key)
    ))
  },
)

export default {
  getConversions,
}
