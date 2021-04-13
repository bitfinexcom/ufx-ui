/* eslint-disable import/prefer-default-export */
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import * as Classes from '../../common/classes'
import { Button } from '../ui'
import { KEYS } from './MarketList.constants'

// key: column key
// label: column header
// cellStyle : td, th style
// headerCellClassName: th classname
// cellClassName: td classname
// renderer: for content to be renderered inside td
export const getColumns = (args = {}) => {
  const { t, isSmallView } = args
  return [
    {
      key: KEYS.FAV,
      label: '',
      cellStyle: { minWidth: '45px' },
      renderer: ({ isFav, toggleFav }) => (
        <Button
          minimal
          onClick={(e) => {
            e.stopPropagation()
            toggleFav()
          }}
          className='fav-button'
        >
          <FontAwesomeIcon size='sm' icon={isFav ? faStar : faStarEmpty} />
        </Button>
      ),
    },
    {
      key: KEYS.BASE_CCY,
      label: t('marketlist:symbol'),
      cellStyle: { width: isSmallView ? '40%' : '20%' },
      renderer: ({ formattedValue, quoteCcy }) => `${formattedValue}/${quoteCcy}`,
    },
    {
      key: KEYS.LAST_PRICE,
      label: (
        <>
          <span className='hidden-lg hidden-md hidden-sm hidden-xs'>{t('marketlist:last_price')}</span>
          <span className='hidden-xl'>{t('marketlist:last')}</span>
        </>
      ),
      cellStyle: { width: isSmallView ? '30%' : '15%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
    },
    {
      key: KEYS.CHANGE_PERC,
      label: (
        <>
          <span className='hidden-lg hidden-md hidden-sm hidden-xs'>{t('marketlist:24h_change')}</span>
          <span className='hidden-xl'>{t('marketlist:change')}</span>
        </>
      ),
      cellStyle: { width: isSmallView ? '25%' : '15%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
      renderer: ({ formattedValue, value }) => (
        <span className={Classes.getColors(value, { strike: 0, includeStrike: true })}>
          {formattedValue}
        </span>
      ),
    },
    {
      key: KEYS.HIGH,
      label: t('marketlist:24h_high'),
      cellStyle: { width: '13%' },
      headerCellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
      cellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
    },
    {
      key: KEYS.LOW,
      label: t('marketlist:24h_low'),
      cellStyle: { width: '13%' },
      headerCellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
      cellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
    },
    {
      key: KEYS.VOLUME,
      label: (
        <>
          <span>{t('marketlist:24h_volume')}</span>
        </>
      ),
      cellStyle: { width: '16%' },
      headerCellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
      cellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
      renderer: ({ formattedValue, quoteCcy }) => (
        <span>
          {`${formattedValue} ${quoteCcy}`}
        </span>
      ),
    },
    {
      key: 'action',
      label: '',
      cellStyle: { width: '4%' },
      headerCellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
      cellClassName: `hidden-sm hidden-xs ${Classes.RIGHT_TO_LEFT}`,
      renderer: () => (
        <FontAwesomeIcon icon={faAngleRight} />
      ),
    },
  ]
}
