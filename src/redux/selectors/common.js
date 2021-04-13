import _get from 'lodash/get'

import { REDUX_STATE_PREFIX } from '../constants/common'

export const EMPTY_OBJ = {}

export const getUfxState = (state) => _get(state, REDUX_STATE_PREFIX, EMPTY_OBJ)

export default { getUfxState }
