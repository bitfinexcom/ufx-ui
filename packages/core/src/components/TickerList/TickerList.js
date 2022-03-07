import { getMappedKey, getValue } from '@ufx-ui/utils'
import cx from 'classnames'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _join from 'lodash/join'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, {
  useCallback, useState, memo, useRef,
} from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import { getVirtualTableColumns } from '../helper'
import { VirtualTable } from '../ui'
import getColumns from './TickerList.columns'
import { MAPPING, KEYS } from './TickerList.constants'
import { rowRenderer } from './TickerList.helpers'
import TickerListToolbar from './TickerList.Toolbar'

const noRowsRenderer = (t) => () => <div className='empty-tickerlist'>{t('tickerlist:empty')}</div>

export const TickerList = (props) => {
  const {
    data,
    favs,
    saveFavs,
    onRowClick,
    showVolumeUnit,
    volumeUnitList,
    volumeUnit,
    setVolumeUnit,
    rowMapping,
    showOnlyFavs,
    setShowOnlyFavs,
    className,
  } = props

  const containerRef = useRef()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  const keyForId = getMappedKey(KEYS.ID, rowMapping)
  const keyForBaseCcy = getMappedKey(KEYS.BASE_CCY, rowMapping)
  const keyForQuoteCcy = getMappedKey(KEYS.QUOTE_CCY, rowMapping)

  const getDisplayValue = useCallback(
    (rowData) => getValue({
      mapping: MAPPING,
      customMapping: rowMapping,
      data: rowData,
    }),
    [rowMapping],
  )

  // filter ccys matching search-term and marked as fav
  const filtered = _filter(data, (row) => {
    const baseCcy = _get(row, keyForBaseCcy)
    const quoteCcy = _get(row, keyForQuoteCcy)
    const defaultLabels = [
      baseCcy,
      quoteCcy,
      baseCcy + quoteCcy,
      `${baseCcy}/${quoteCcy}`,
    ]
    const ccyLabels = getDisplayValue(row)(KEYS.CCY_LABELS) || []

    const matches = _toLower(_join([...ccyLabels, ...defaultLabels]))

    return (
      _includes(matches, _toLower(searchTerm))
      && (!showOnlyFavs || favs[row[keyForId]])
    )
  })

  const toggleFav = useCallback(
    (id) => {
      const newFavs = {
        ...favs,
        [id]: !favs[id],
      }
      saveFavs(newFavs)
    },
    [favs, saveFavs],
  )

  const columns = getVirtualTableColumns(
    getColumns,
    {
      getDisplayValue,
      t,
      favs,
      toggleFav,
      showOnlyFavs,
      setShowOnlyFavs,
      showVolumeUnit,
      volumeUnit,
      setVolumeUnit,
      volumeUnitList,
    },
    rowMapping,
  )

  const calculateRowHeight = () => {
    const width = _get(containerRef, 'current.offsetWidth', 0)
    if (width > 370) {
      return 34
    }

    return 42
  }

  return (
    <div className={cx(Classes.TICKER_LIST, className)} ref={containerRef}>
      <TickerListToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <VirtualTable
        columns={columns}
        data={filtered}
        onRowClick={onRowClick}
        // give default key, dont give customised key
        defaultSortBy={KEYS.VOLUME}
        defaultSortDirection='DESC'
        headerClassName={`${Classes.BUTTON} ${Classes.BUTTON}--minimal`}
        rowHeight={calculateRowHeight()}
        interactive
        striped
        noRowsRenderer={noRowsRenderer(t)}
        rowRenderer={rowRenderer}
      />
    </div>
  )
}

TickerList.propTypes = {
  /**
   * The array of tickers data
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      baseCcy: PropTypes.string.isRequired,
      quoteCcy: PropTypes.string.isRequired,
      changePerc: PropTypes.number.isRequired,
      lastPrice: PropTypes.number.isRequired,
      volume: PropTypes.number.isRequired,
      ccyLabels: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  /**
   * Object with pairs, selected as favorites
   */
  favs: PropTypes.objectOf(PropTypes.bool).isRequired,
  /**
   * The function, called, when user sets pair as favorite
   */
  saveFavs: PropTypes.func.isRequired,
  /**
   * The function, called when a ticker row is clicked
   */
  onRowClick: PropTypes.func,
  /**
   * If true, the volume equivalent unit toggler is showing
   */
  showVolumeUnit: PropTypes.bool,
  /**
   * The object with enabled currencies for volume unit toggler
   */
  volumeUnitList: PropTypes.objectOf(PropTypes.string),
  /**
   * The current volume equivalent currency
   */
  volumeUnit: PropTypes.string,
  /**
   * The function, called when user change volume equivalent unit
   */
  setVolumeUnit: PropTypes.func,
  /**
   * The custom field/column mapping for the data.
   */
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  /**
   * The function, called when user clicks
   * on show only favs button
   */
  setShowOnlyFavs: PropTypes.func.isRequired,
  /**
   * If true, only favorite pairs are showing
   */
  showOnlyFavs: PropTypes.bool.isRequired,
  /**
   * The classname of TickerList
   */
  className: PropTypes.string,
}

export const defaultProps = {
  data: [],
  onRowClick: () => {},
  showVolumeUnit: false,
  volumeUnitList: {},
  volumeUnit: null,
  setVolumeUnit: () => {},
  rowMapping: {},
  className: null,
}

TickerList.defaultProps = defaultProps

export default withI18nProvider(memo(TickerList))
