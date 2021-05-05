import PropTypes from 'prop-types'
import React from 'react'

import * as Classes from '../../common/classes'

/**
 * Only fade trailing zeros if they are decimals
 *
 */
const FadeTrailingZeros = (props) => {
  const { value } = props

  const stringValue = value.toString()
  const hasDecimals = stringValue.match(/\./)
  const trailingZeros = stringValue.match(/(0+)$/g)

  if (hasDecimals && trailingZeros) {
    const [prec, dec] = stringValue.split('.')
    const d = dec.replace(/(0+)$/g, '')

    return (
      <span>
        {prec}.{d}
        {trailingZeros
          && <span className={Classes.FADE_TRAILING_ZEROS}>{trailingZeros[0]}</span>}
      </span>
    )
  }
  return <span>{stringValue}</span>
}

FadeTrailingZeros.propTypes = {
  /**
   * The value to format
   */
  value: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
}

export default FadeTrailingZeros
