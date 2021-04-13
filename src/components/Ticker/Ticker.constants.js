/* eslint-disable import/prefer-default-export */
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { formatPrice, formatVolume, formatVolumePercentChange } from '../../functions/number'
import { i18n } from '../../i18n'

export const KEYS = {
  BASE_CCY: 'baseCcy',
  QUOTE_CCY: 'quoteCcy',
  LAST_PRICE: 'lastPrice',
  CHANGE: 'change',
  CHANGE_PERC: 'changePerc',
  VOLUME: 'volume',
  HIGH: 'high',
  LOW: 'low',
}

export const MAPPING = {
  [KEYS.QUOTE_CCY]: {
    renderer: ({ formattedValue }) => `/ ${formattedValue}`,
  },
  [KEYS.LAST_PRICE]: {
    defaultValue: 0,
    format: formatPrice,
  },
  [KEYS.CHANGE]: {
    defaultValue: 0,
    format: formatPrice,
  },
  [KEYS.CHANGE_PERC]: {
    defaultValue: 0,
    format: (value) => formatVolumePercentChange(value, 2),
    renderer: ({ value, formattedValue }) => (
      <>
        <FontAwesomeIcon
          className='change-icon'
          icon={value >= 0 ? faCaretUp : faCaretDown}
        />
        ({formattedValue})
      </>
    )
    ,
  },
  [KEYS.VOLUME]: {
    defaultValue: 0,
    format: formatVolume,
    renderer: ({ formattedValue, volumeUnit }) => (
      <>
        <div className='label'>{i18n.t('ticker:volume')}</div>
        {/* Use &nbsp; as space here so that the volume unit doesn’t appear on the next line */}
        <div className='value'>{formattedValue}&nbsp;{volumeUnit}</div>
      </>
    ),
  },
  [KEYS.HIGH]: {
    defaultValue: 0,
    format: formatPrice,
    renderer: ({ formattedValue }) => (
      <>
        <div className='label'>{i18n.t('ticker:high')}</div>
        <div className='value'>{formattedValue}</div>
      </>
    ),
  },
  [KEYS.LOW]: {
    defaultValue: 0,
    format: formatPrice,
    renderer: ({ formattedValue }) => (
      <>
        <div className='label'>{i18n.t('ticker:low')}</div>
        <div className='value'>{formattedValue}</div>
      </>
    ),
  },
}
