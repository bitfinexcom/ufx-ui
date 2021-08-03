import { getMappedKey, getValue } from '@ufx-ui/utils'
import cx from 'classnames'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _join from 'lodash/join'
import _map from 'lodash/map'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, {
  useCallback, useState, useMemo, memo,
  useRef,
} from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import { VirtualTable } from '../ui'
import getColumns from './TickerList.columns'
import { MAPPING, KEYS } from './TickerList.constants'
import TickerListToolbar from './TickerList.Toolbar'

const noRowsRenderer = (t) => () => (
  <div className='empty-tickerlist'>
    {t('tickerlist:empty')}
  </div>
)

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
  const keyForCcyLabels = getMappedKey(KEYS.CCY_LABELS, rowMapping)

  // filter ccys matching search-term and marked as fav
  const filtered = _filter(data,
    (row) => {
      const baseCcy = _get(row, keyForBaseCcy)
      const quoteCcy = _get(row, keyForQuoteCcy)
      const defaultLabels = [baseCcy, quoteCcy, baseCcy + quoteCcy, `${baseCcy}/${quoteCcy}`]
      const ccyLabels = _get(row, keyForCcyLabels, [])

      const matches = _toLower(_join([...ccyLabels, ...defaultLabels]))

      return (
        _includes(matches, _toLower(searchTerm))
        && (!showOnlyFavs || favs[row[keyForId]])
      )
    })

  const toggleFav = useCallback((id) => {
    const newFavs = {
      ...favs,
      [id]: !favs[id],
    }
    saveFavs(newFavs)
  }, [favs, saveFavs])

  const getDisplayValue = useCallback(
    (rowData) => getValue({
      mapping: MAPPING,
      customMapping: rowMapping,
      data: rowData,
    }),
    [rowMapping],
  )

  const columns = useMemo(() => {
    const cols = getColumns({
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
    })
    const customisedRenderer = _map(cols, (col) => {
      const cellRenderer = _get(rowMapping, [col.dataKey, 'renderer'], col.renderer)
      const sortKey = _get(rowMapping, [col.dataKey, 'selector'], col.dataKey)

      return {
        ...col,
        sortKey,
        cellRenderer,
      }
    })

    return customisedRenderer
  }, [getDisplayValue, favs, toggleFav, showOnlyFavs, setShowOnlyFavs, showVolumeUnit, volumeUnit, setVolumeUnit, volumeUnitList, rowMapping, t])

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
        headerClassName='ufx-button ufx-button--minimal'
        rowHeight={calculateRowHeight()}
        interactive
        striped
        noRowsRenderer={noRowsRenderer(t)}
      />
    </div>
  )
}

TickerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  favs: PropTypes.objectOf(PropTypes.bool).isRequired,
  saveFavs: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  showVolumeUnit: PropTypes.bool,
  volumeUnitList: PropTypes.objectOf(PropTypes.string),
  volumeUnit: PropTypes.string,
  setVolumeUnit: PropTypes.func,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  setShowOnlyFavs: PropTypes.func.isRequired,
  showOnlyFavs: PropTypes.bool.isRequired,
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
