import PropTypes from 'prop-types'

import { INTENT_TYPES_ARR } from '../../../common/intent'

export const PROP_NOTIFICATION = {
  cid: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  level: PropTypes.oneOf(INTENT_TYPES_ARR).isRequired,
}

export default {
  PROP_NOTIFICATION,
}
