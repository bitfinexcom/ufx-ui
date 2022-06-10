import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _get from 'lodash/get'
import React from 'react'
import { defaultTableHeaderRenderer } from 'react-virtualized'

import { getColors } from '../../common/classes'
import { getDefaultCellRenderer } from '../helper'
import { Button, Truncate } from '../ui'
import { KEYS, STYLES } from './TickerList.constants'
import { Favorite, Volume } from './TickerList.Header'

// label: column header
// dataKey: represents data in table cell
// headerStyle : style for table header-cell
// style : style for table row-cell
// headerRenderer: renderer for table header-cell
// renderer: renderer for table row-cell
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
    headerStyle: STYLES.favorite,
    style: STYLES.favorite,
    width: 30,
    flexGrow: 0.1,
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
    headerStyle: STYLES.pair,
    style: STYLES.pair,
    width: 88,
    flexGrow: 1,
    renderer: ({ rowData }) => {
      const baseCcy = getDisplayValue(rowData)(KEYS.BASE_CCY)
      const quoteCcy = getDisplayValue(rowData)(KEYS.QUOTE_CCY)

      return (
        <span>
          {baseCcy}
          <span className='price-unit'>/{quoteCcy}</span>
        </span>
      )
    },
  }, {
    label: t('tickerlist:last_price'),
    dataKey: KEYS.LAST_PRICE,
    headerStyle: STYLES.lastPrice,
    style: STYLES.lastPrice,
    width: 63,
    flexGrow: 1,
    renderer: getDefaultCellRenderer(getDisplayValue),
  },
  {
    label: t('tickerlist:24h_change'),
    dataKey: KEYS.CHANGE_PERC,
    headerStyle: STYLES.changePerc,
    style: STYLES.changePerc,
    width: 57,
    flexGrow: 1,
    renderer: ({ dataKey, rowData }) => {
      const formattedValue = getDisplayValue(rowData)(dataKey)
      const value = getDisplayValue(rowData)(dataKey, false)

      return (
        <Truncate>
          <span className={getColors(value, { strike: 0, includeStrike: true })}>
            {formattedValue}
          </span>
        </Truncate>
      )
    },
  }, {
    headerRenderer: () => (
      <div className="ReactVirtualized__Table__headerTruncatedText">
        <Volume
          showVolumeUnit={showVolumeUnit}
          volumeUnit={volumeUnit}
          setVolumeUnit={setVolumeUnit}
          volumeUnitList={volumeUnitList}
        />
      </div>
    ),
    dataKey: KEYS.VOLUME,
    headerStyle: STYLES.volume,
    style: STYLES.volume,
    width: 82,
    flexGrow: 1,
    renderer: getDefaultCellRenderer(getDisplayValue),
  },
]

export default getColumns
