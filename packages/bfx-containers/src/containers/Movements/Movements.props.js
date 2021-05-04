import PropTypes from 'prop-types'

export const WALLET_PROPS = PropTypes.arrayOf(
  PropTypes.shape({
    address: PropTypes.string,
    name: PropTypes.string.isRequired,
  }),
)

export const TETHER_PROTOCOL_PROPS = PropTypes.objectOf(
  PropTypes.shape({
    description: PropTypes.string,
    ccy: PropTypes.string,
    transport_ccy: PropTypes.string,
    method: PropTypes.string,
    cc_tx: PropTypes.bool,
  }),
)
