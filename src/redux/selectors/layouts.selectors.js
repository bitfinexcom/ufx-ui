import _get from 'lodash/get'

import { getUfxState } from './common'

const EMPTY_OBJ = {}

const getReducer = state => _get(getUfxState(state), 'layouts', EMPTY_OBJ)

export const getLayoutIsEditable = (state) => getReducer(state).editEnabled

export default {
  getLayoutIsEditable,
}
