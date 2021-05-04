import { getMappedKey } from '@ufx-ui/utils'
import _indexOf from 'lodash/indexOf'
import _keys from 'lodash/keys'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../../common/props'
import { SortButton } from '../../ui'
import { KEYS } from '../TickerList.constants'
import FavoriteHeader from './Headers/Favorite'
import VolumeHeader from './Headers/Volume'

const TickerListHeader = (props) => {
  const {
    sortBy,
    setSortBy,
    sortAsc,
    setSortAsc,
    showOnlyFavs,
    setShowOnlyFavs,
    showVolumeUnit,
    volumeUnitList,
    volumeUnit,
    setVolumeUnit,
    dataMapping,
    columns,
  } = props

  const toggleVolumeUnit = (e) => {
    e.stopPropagation() // Do not propagate to avoid sorting when clicking volumeUnit buttons
    const units = _keys(volumeUnitList)
    const nextUnitIndex = (_indexOf(units, volumeUnit) + 1) % units.length
    setVolumeUnit(units[nextUnitIndex])
  }

  const onSort = ({ key, defaultSortAsc } = {}) => {
    const mappedKey = getMappedKey(key, dataMapping)
    setSortAsc(mappedKey === sortBy ? !sortAsc : defaultSortAsc)
    setSortBy(mappedKey)
  }

  return (
    <thead>
      <tr>
        <FavoriteHeader
          showOnlyFavs={showOnlyFavs}
          setShowOnlyFavs={setShowOnlyFavs}
        />
        {columns.map(column => {
          const {
            key, label, defaultSortAsc, cellStyle, headerCellClassName,
          } = column || {}
          const mappedKey = getMappedKey(key, dataMapping)

          return (
            <th
              key={mappedKey}
              className={headerCellClassName}
              style={cellStyle}
            >
              <SortButton
                content={showVolumeUnit && key === KEYS.VOLUME
                  ? (
                    <VolumeHeader
                      volumeUnit={volumeUnit}
                      setVolumeUnit={toggleVolumeUnit}
                      volumeUnitList={volumeUnitList}
                      showVolumeUnit={showVolumeUnit}
                      field={key}
                    />
                  )
                  : label}
                onSortClick={() => onSort(column)}
                sortBy={sortBy}
                sortAscending={sortAsc}
                defaultSortAscending={defaultSortAsc}
                field={mappedKey}
              />
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

TickerListHeader.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortAsc: PropTypes.bool.isRequired,
  setSortAsc: PropTypes.func.isRequired,
  showOnlyFavs: PropTypes.bool.isRequired,
  setShowOnlyFavs: PropTypes.func.isRequired,
  showVolumeUnit: PropTypes.bool.isRequired,
  volumeUnitList: PropTypes.objectOf(PropTypes.string).isRequired,
  volumeUnit: PropTypes.string,
  setVolumeUnit: PropTypes.func.isRequired,
  dataMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TickerListHeader.defaultProps = {
  volumeUnit: null,
  dataMapping: {},
}

export default memo(TickerListHeader)
