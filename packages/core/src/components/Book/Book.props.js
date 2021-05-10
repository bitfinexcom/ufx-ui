import PropTypes from 'prop-types'

export const PROP_BOOK = {
  count: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
}

export const PROP_BOOK_TRADE = {
  total: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
}

export const PROP_ORDER = {
  amount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}
