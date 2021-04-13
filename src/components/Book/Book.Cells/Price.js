import PropTypes from 'prop-types'
import React, { memo } from 'react'

import PrettyValue from '../../format/PrettyValue'

const Price = (props) => {
  const {
    data,
    decimals,
  } = props

  return <PrettyValue value={+data} decimals={decimals} />
}

Price.propTypes = {
  data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  decimals: PropTypes.number.isRequired,
}

export default memo(Price)
