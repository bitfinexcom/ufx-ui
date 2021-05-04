import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getValue } from '@ufx-ui/utils'
import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import { Button } from '../ui'
import { KEYS, MAPPING } from './Ticker.constants'

export const Ticker = (props) => {
  const {
    data,
    ccyIcon,
    onShowInfoClick,
    showCoinInfoIcon,
    className,
    dataMapping: customMapping,
    volumeUnit,
  } = props

  const getDisplayValue = getValue({
    mapping: MAPPING,
    customMapping,
    data,
  })

  const quoteCcy = getDisplayValue(KEYS.QUOTE_CCY)
  const changePerc = getDisplayValue(KEYS.CHANGE_PERC, false)

  const classes = cx(Classes.TICKER, className)
  const colorClass = Classes.getColors(changePerc, { strike: 0, includeStrike: true })

  const renderCell = (key) => {
    const value = getDisplayValue(key, false)
    const formattedValue = getDisplayValue(key)

    const renderer = _get(customMapping, [key, 'renderer']) || _get(MAPPING, [key, 'renderer']) || (({ formattedValue: v }) => v)

    return renderer({
      value,
      formattedValue,
      data,
      quoteCcy,
      volumeUnit,
    })
  }

  return (
    <div className={classes}>
      <div className='info'>
        {ccyIcon && <div className='ccy-icon'>{ccyIcon}</div>}
        <div className='highlight'>{renderCell(KEYS.BASE_CCY)}</div>
        <div className='quote-ccy'>{renderCell(KEYS.QUOTE_CCY)}</div>
        {showCoinInfoIcon && (
          <Button
            className='info-icon'
            onClick={onShowInfoClick}
          >
            <FontAwesomeIcon size='sm' icon={faInfoCircle} />
          </Button>
        )}
      </div>
      <div className='last-price'>
        <div className='price highlight'>{renderCell(KEYS.LAST_PRICE)}</div>
      </div>
      <div className={cx('price-change', colorClass)}>
        <span className='price'>
          {renderCell(KEYS.CHANGE)}
        </span>
        <span className='perc'>
          {renderCell(KEYS.CHANGE_PERC)}
        </span>
      </div>
      <div className='volume'>
        {renderCell(KEYS.VOLUME)}
      </div>
      <div className='high'>
        {renderCell(KEYS.HIGH)}
      </div>
      <div className='low'>
        {renderCell(KEYS.LOW)}
      </div>
    </div>
  )
}

Ticker.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  ccyIcon: PropTypes.node,
  showCoinInfoIcon: PropTypes.bool,
  onShowInfoClick: PropTypes.func,
  className: PropTypes.string,
  dataMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
}

export const defaultProps = {
  data: {},
  ccyIcon: null,
  showCoinInfoIcon: false,
  onShowInfoClick: () => { },
  className: null,
  dataMapping: {},
}

Ticker.defaultProps = defaultProps

export default withI18nProvider(memo(Ticker))
