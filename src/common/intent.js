import _values from 'lodash/values'

const Intent = {
  NONE: 'none',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
}

export const INTENT_TYPES_ARR = _values(Intent)

export default Intent
