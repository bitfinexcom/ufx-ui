import { formatNumber } from '@ufx-ui/utils'
import cx from 'classnames'
import _isFinite from 'lodash/isFinite'
import PropTypes from 'prop-types'
import React from 'react'

import { getColors } from '../../common/classes'
import FadeTrailingZeros from './FadeTrailingZeros'

/**
 * this component will merge all the number formatting functions
 * params will dictate how the value must be presented declaratively
 */
// TODO: add onclick keyboard support and styles
const PrettyValue = (props) => {
  const {
    value,
    decimals,
    sigFig,
    fadeTrailingZeros,
    strike,
    includeStrike,
    className,
    symbol,
    symbolBefore,
    absolute,
    onClick,
    ...rest
  } = props

  if (!_isFinite(+value)) {
    return (<span>{value.toString()}</span>)
  }

  const v = (absolute)
    ? Math.abs(value)
    : value

  const opts = {
    number: v,
    decimals,
    significantFigures: sigFig,
    useGrouping: true,
  }
  const prettyValue = formatNumber(opts)

  if (onClick) {
    rest.onClick = () => onClick(prettyValue.replace(',', ''))
  }
  const color = getColors(v, { strike, includeStrike })
  const classes = cx(color, className)

  const contentInner = (fadeTrailingZeros)
    ? <FadeTrailingZeros value={prettyValue} />
    : prettyValue

  return (
    <>
      {symbol && symbolBefore && symbol}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <span className={classes} {...rest}>
        {contentInner}
      </span>
      {symbol && !symbolBefore && symbol}
    </>
  )
}

PrettyValue.propTypes = {
  /**
  * The value to format
  */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * The number of decimal digits to show, will take precedence on sigFig prop
   */
  decimals: PropTypes.number,
  /**
   * The significant digits of the value
   */
  sigFig: PropTypes.number,
  /**
   * Whether to fade trailing zeros
   */
  fadeTrailingZeros: PropTypes.bool,
  /**
   * Strike if specified, colours the value in red if < than strike, green otherwise
   */
  strike: PropTypes.number,
  /**
   * Determines if strike has to be red or green
   */
  includeStrike: PropTypes.bool,
  /**
   * Class to pass along to the value wrapper element.
   */
  className: PropTypes.string,
  /**
   * The symbol to show beside the value
   */
  symbol: PropTypes.string,
  /**
   * Whether symbol should be before the value
   */
  symbolBefore: PropTypes.bool,
  /**
   * Whether it should show absolute value
   */
  absolute: PropTypes.bool,
  /**
   * Fn to call when value is clicked
   */
  onClick: PropTypes.func,
}

// *   @param {string} symbol the symbol to show beside the value
// *   @param {boolean} symbolBefore determines if symbol must be after or before value

PrettyValue.defaultProps = {
  value: 'N/A',
  decimals: null,
  sigFig: null,
  fadeTrailingZeros: false,
  strike: null,
  includeStrike: false,
  symbol: null,
  symbolBefore: false,
  absolute: false,
  className: null,
  onClick: null,
}

export default PrettyValue
