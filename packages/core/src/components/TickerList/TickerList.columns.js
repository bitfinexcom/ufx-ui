import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getFormattedValue } from '@ufx-ui/utils'
import _get from 'lodash/get'
import React from 'react'

import { getColors } from '../../common/classes'
import { Button } from '../ui'
import { KEYS, styles } from './TickerList.constants'
import { Favorite, Volume } from './TickerList.Header'

// label: column header
// dataKey: represents data in table cell
// cellStyle : td, th style
// renderer: for content to be renderered inside td
const getColumns = ({
  t, getDisplayValue, favs, toggleFav,
  showOnlyFavs, setShowOnlyFavs,
  showVolumeUnit, volumeUnit, setVolumeUnit, volumeUnitList,
} = {}) => [
  {
    headerRenderer: () => (
      <Favorite showOnlyFavs={showOnlyFavs} setShowOnlyFavs={setShowOnlyFavs} />
    ),
    dataKey: KEYS.ID,
    headerStyle: styles.favorite,
    style: styles.favorite,
    disableSort: true,
    renderer: ({ dataKey, rowData }) => {
      const id = _get(rowData, dataKey)
      const isFav = !!favs[id]

      const handleFavIconClick = (e) => {
        e.stopPropagation()
        toggleFav(id)
      }

      return (
        <div className='fav-col'>
          <Button
            minimal
            onClick={handleFavIconClick}
          >
            <FontAwesomeIcon
              icon={isFav ? faStar : faStarEmpty}
              className='fav-icon'
            />
          </Button>
        </div>
      )
    },
  }, {
    label: t('tickerlist:pair'),
    dataKey: KEYS.BASE_CCY,
    headerStyle: styles.pair,
    style: styles.pair,
    renderer: ({ rowData }) => {
      const baseCcy = getDisplayValue(rowData)(KEYS.BASE_CCY)
      const quoteCcy = getDisplayValue(rowData)(KEYS.QUOTE_CCY)

      return (
        <>
          <span>
            {baseCcy}
            <span className='price-unit'>/{quoteCcy}</span>
          </span>
        </>
      )
    },
  }, {
    label: t('tickerlist:last_price'),
    dataKey: KEYS.LAST_PRICE,
    headerStyle: styles.lastPrice,
    style: styles.lastPrice,
    renderer: getFormattedValue(getDisplayValue),
  },
  {
    label: t('tickerlist:24h_change'),
    dataKey: KEYS.CHANGE_PERC,
    width: '15%',
    headerStyle: styles.changePerc,
    style: styles.changePerc,
    renderer: ({ dataKey, rowData }) => {
      const formattedValue = getDisplayValue(rowData)(dataKey)
      const value = getDisplayValue(rowData)(dataKey, false)

      return (
        <span className={getColors(value, { strike: 0, includeStrike: true })}>
          {formattedValue}
        </span>
      )
    },
  }, {
    label: <Volume
      showVolumeUnit={showVolumeUnit}
      volumeUnit={volumeUnit}
      setVolumeUnit={setVolumeUnit}
      volumeUnitList={volumeUnitList}
    />,
    dataKey: KEYS.VOLUME,
    headerStyle: styles.volume,
    style: styles.volume,
    renderer: getFormattedValue(getDisplayValue),
  },
]

export default getColumns
