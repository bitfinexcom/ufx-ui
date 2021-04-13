import PropTypes from 'prop-types'
import React, { memo } from 'react'

import PrettyValue from '../../format/PrettyValue'

const Amount = (props) => {
  const { data, prec } = props
  const value = Math.abs(+data)
  // decimals based on precision
  // - P0: 4 decimals
  // - P1: 3 decimals
  // - P2: 2 decimals
  // - P3: 1 decimal
  // - P4: 0 decimals
  const decimals = Math.max(4 - prec, 0)

  return <PrettyValue value={value} decimals={decimals} />
}

Amount.propTypes = {
  data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  prec: PropTypes.number,
}

Amount.defaultProps = {
  prec: 0,
}

export default memo(Amount)
