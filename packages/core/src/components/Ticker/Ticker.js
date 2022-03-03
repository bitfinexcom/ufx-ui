import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getValue } from '@ufx-ui/utils'
import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

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

  const baseCcy = getDisplayValue(KEYS.BASE_CCY)
  const quoteCcy = getDisplayValue(KEYS.QUOTE_CCY)
  const changePerc = getDisplayValue(KEYS.CHANGE_PERC, false)

  const classes = cx(Classes.TICKER, className)
  const colorClass = Classes.getColors(changePerc, { strike: 0, includeStrike: true })
  const { t } = useTranslation()

  const renderCell = (key) => {
    const value = getDisplayValue(key, false)
    const formattedValue = getDisplayValue(key)

    const renderer = _get(customMapping, [key, 'renderer']) || _get(MAPPING, [key, 'renderer']) || (({ formattedValue: v }) => v)

    return renderer({
      value,
      formattedValue,
      data,
      baseCcy,
      quoteCcy,
      volumeUnit,
      t,
    })
  }

  return (
    <div className={classes}>
      <div className='info'>
        {ccyIcon && <div className='ccy-icon'>{ccyIcon}</div>}
        {renderCell(KEYS.BASE_CCY)}
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
  /**
   * The object with ticker data
   */
  data: PropTypes.shape({
    baseCcy: PropTypes.string.isRequired,
    quoteCcy: PropTypes.string.isRequired,
    lastPrice: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    changePerc: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    high: PropTypes.number.isRequired,
    low: PropTypes.number.isRequired,
  }),
  /**
   * The base currency icon
   */
  ccyIcon: PropTypes.node,
  /**
   * If true, the info button is showing
   */
  showCoinInfoIcon: PropTypes.bool,
  /**
   * The function, called when user clicks on coin info button
   */
  onShowInfoClick: PropTypes.func,
  /**
   * The className of Ticker container
   */
  className: PropTypes.string,
  /**
   * The custom field/column mapping for the data.
   */
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
