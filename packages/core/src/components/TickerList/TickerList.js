import { getMappedKey } from '@ufx-ui/utils'
import cx from 'classnames'
import _get from 'lodash/get'
import _includes from 'lodash/includes'
import _isEmpty from 'lodash/isEmpty'
import _join from 'lodash/join'
import _orderBy from 'lodash/orderBy'
import _size from 'lodash/size'
import _toLower from 'lodash/toLower'
import PropTypes from 'prop-types'
import React, {
  useState,
  useMemo,
  memo,
  useRef,
} from 'react'
import { useTranslation } from 'react-i18next'
import {
  AutoSizer, List,
} from 'react-virtualized'

import * as Classes from '../../common/classes'
import { DATA_MAPPING } from '../../common/props'
import withI18nProvider from '../../hoc/withI18nProvider'
import { Table } from '../ui'
import getColumns from './TickerList.columns'
import { KEYS } from './TickerList.constants'
import TickerListHeader from './TickerList.Header'
import Row from './TickerList.Row'
import TickerListToolbar from './TickerList.Toolbar'

const DEFAULT_HEIGHT = 30

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
  const keyForId = getMappedKey(KEYS.ID, rowMapping)
  const keyForBaseCcy = getMappedKey(KEYS.BASE_CCY, rowMapping)
  const keyForQuoteCcy = getMappedKey(KEYS.QUOTE_CCY, rowMapping)
  const keyForCcyLabels = getMappedKey(KEYS.CCY_LABELS, rowMapping)
  const keyForVolume = getMappedKey(KEYS.VOLUME, rowMapping)
  const [sortBy, setSortBy] = useState(keyForVolume)
  const [sortAsc, setSortAsc] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useTranslation()

  const containerRef = useRef()
  const containerWidth = containerRef.current?.clientWidth || 200

  const ordered = _orderBy(
    data,
    [sortBy],
    [sortAsc ? 'asc' : 'desc'],
  )

  // filter ccys matching search-term and marked as fav
  const filtered = ordered.filter(
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
    },
  )

  const lengthOfList = _size(filtered)

  const toggleFav = (id) => {
    const newFavs = {
      ...favs,
      [id]: !favs[id],
    }
    saveFavs(newFavs)
  }

  const calculatedRowHeight = useMemo(() => {
    if (containerWidth < 320) {
      return 60
    }
    if (containerWidth >= 320 && containerWidth < 550) {
      return 45
    }
    return DEFAULT_HEIGHT
  }, [containerWidth])

  const heightOfTickerList = useMemo(() => lengthOfList * calculatedRowHeight, [lengthOfList, calculatedRowHeight])

  const columns = useMemo(() => getColumns({ t }), [t])

  return (
    <div
      className={cx(Classes.TICKER_LIST, className)}
      ref={containerRef}
    >
      <TickerListToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Table condensed>
        <TickerListHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortAsc={sortAsc}
          setSortAsc={setSortAsc}
          showOnlyFavs={showOnlyFavs}
          setShowOnlyFavs={setShowOnlyFavs}
          showVolumeUnit={showVolumeUnit}
          volumeUnitList={volumeUnitList}
          volumeUnit={volumeUnit}
          setVolumeUnit={setVolumeUnit}
          dataMapping={rowMapping}
          columns={columns}
        />
      </Table>
      {_isEmpty(filtered)
        ? (
          <div className='empty-tickerlist'>
            {t('tickerlist:empty')}
          </div>
        )
        : (
          <div className={`${Classes.TICKER_LIST}__body`}>
            {lengthOfList > 50 ? (
              <AutoSizer>
                {({ width }) => (
                  <List
                    height={heightOfTickerList}
                    width={width}
                    rowHeight={calculatedRowHeight}
                    rowCount={lengthOfList}
                    disableHeader
                    rowRenderer={({ index, style }) => {
                      const row = filtered[index]
                      const id = _get(row, keyForId)
                      return (
                        <Row
                          key={id}
                          data={row}
                          dataMapping={rowMapping}
                          isFav={!!favs[id]}
                          toggleFav={toggleFav}
                          onRowClick={onRowClick}
                          columns={columns}
                          style={style}
                        />
                      )
                    }}
                  />
                )}
              </AutoSizer>
            ) : filtered.map((row) => {
              const id = _get(row, keyForId)
              return (
                <Row
                  key={id}
                  data={row}
                  dataMapping={rowMapping}
                  isFav={!!favs[id]}
                  toggleFav={toggleFav}
                  onRowClick={onRowClick}
                  columns={columns}
                />
              )
            })}
          </div>
        )}
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
