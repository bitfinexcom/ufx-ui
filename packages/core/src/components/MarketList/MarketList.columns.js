/* eslint-disable import/prefer-default-export */
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { KEYS } from './MarketList.constants'
import * as Classes from '../../common/classes'
import { getDefaultCellRenderer } from '../helper'
import { Button, Truncate } from '../ui'

// dataKey: column key
// label: column header
// headerClassName: th classname
// className: td classname
// renderer: for content to be renderered inside td
export const getColumns = (args = {}) => {
  const {
    t, isSmallView, getDisplayValue, toggleFav, favs,
  } = args
  return [
    {
      dataKey: KEYS.FAV,
      label: '',
      width: 50,
      flexGrow: 0.1,
      renderer: ({ rowData }) => {
        const id = getDisplayValue(rowData, false)(KEYS.ID)
        const isFav = !!favs[id]

        const handleFavIconClick = (e) => {
          e.stopPropagation()
          toggleFav(id)
        }

        return (
          <Button
            minimal
            onClick={handleFavIconClick}
            className='fav-button'
          >
            <FontAwesomeIcon size='sm' icon={isFav ? faStar : faStarEmpty} />
          </Button>
        )
      },
    },
    {
      dataKey: KEYS.BASE_CCY,
      label: t('marketlist:symbol'),
      width: 150,
      flexGrow: 1,
      renderer: ({ rowData }) => {
        const baseCcy = getDisplayValue(rowData)(KEYS.BASE_CCY)
        const quoteCcy = getDisplayValue(rowData)(KEYS.QUOTE_CCY)

        return <Truncate>{`${baseCcy}/${quoteCcy}`}</Truncate>
      },
    },
    {
      dataKey: KEYS.LAST_PRICE,
      label: (
        <>
          <span className='hidden-lg hidden-ml hidden-md hidden-sm hidden-s hidden-xs hidden-xxs'>{t('marketlist:last_price')}</span>
          <span className='hidden-xl hidden-hg'>{t('marketlist:last')}</span>
        </>
      ),
      width: 150,
      flexGrow: 1,
      headerClassName: Classes.RIGHT_TO_LEFT,
      className: Classes.RIGHT_TO_LEFT,
      renderer: getDefaultCellRenderer(getDisplayValue),
    },
    ...(isSmallView ? [] : [{
      dataKey: KEYS.CHANGE_PERC,
      label: (
        <>
          <span className='hidden-lg hidden-ml hidden-md hidden-sm hidden-s hidden-xs hidden-xxs'>{t('marketlist:24h_change')}</span>
          <span className='hidden-xl hidden-hg'>{t('marketlist:change')}</span>
        </>
      ),
      width: 150,
      flexGrow: 1,
      headerClassName: Classes.RIGHT_TO_LEFT,
      className: Classes.RIGHT_TO_LEFT,
      renderer: ({ dataKey, rowData }) => {
        const formattedValue = getDisplayValue(rowData)(dataKey)
        const value = getDisplayValue(rowData)(dataKey, false)

        return (
          <Truncate>
            <span className={Classes.getColors(value, { strike: 0, includeStrike: true })}>
              {formattedValue}
            </span>
          </Truncate>
        )
      },
    }]),
    ...(isSmallView ? [] : [{
      dataKey: KEYS.HIGH,
      label: t('marketlist:24h_high'),
      width: 150,
      flexGrow: 1,
      headerClassName: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      className: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      renderer: getDefaultCellRenderer(getDisplayValue),
    }]),
    ...(isSmallView ? [] : [{
      dataKey: KEYS.LOW,
      label: t('marketlist:24h_low'),
      width: 150,
      flexGrow: 1,
      headerClassName: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      className: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      renderer: getDefaultCellRenderer(getDisplayValue),
    }]),
    {
      dataKey: KEYS.VOLUME,
      label: (
        <>
          <span>{t('marketlist:24h_volume')}</span>
        </>
      ),
      width: 150,
      flexGrow: 1,
      headerClassName: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      className: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      renderer: ({ dataKey, rowData }) => {
        const formattedValue = getDisplayValue(rowData)(dataKey)
        const quoteCcy = getDisplayValue(rowData)(KEYS.QUOTE_CCY)

        return (
          <Truncate>
            <span>
              {`${formattedValue} ${quoteCcy}`}
            </span>
          </Truncate>
        )
      },
    },
    {
      dataKey: 'action',
      width: 20,
      flexGrow: 0.1,
      headerClassName: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      className: `hidden-sm hidden-s hidden-xs hidden-xxs ${Classes.RIGHT_TO_LEFT}`,
      renderer: () => (
        <FontAwesomeIcon icon={faAngleRight} />
      ),
    },
  ]
}
