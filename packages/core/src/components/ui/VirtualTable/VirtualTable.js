/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable padded-blocks */
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'

import { getSortedData as getSortedDataHelper, sortData } from './VirtualTable.helpers'

const VirtualTable = ({
  data, columns, onRowClick, rowHeight, headerHeight, defaultSortBy, defaultSortDirection, getSortedData, sortedDataPostProcessor,
}) => {
  const [sortBy, setSortBy] = useState(defaultSortBy)
  const [sortDirection, setSortDirection] = useState(defaultSortDirection)
  const [processedData, setProcessedData] = useState([])
  const [seedData, setSeedData] = useState(null)
  const [seedSortBy, setSeedSortBy] = useState(null)
  const [seedSortDirection, setSeedSortDirection] = useState(defaultSortDirection)

  useEffect(() => {
    const seedSortingChanged = (defaultSortBy !== seedSortBy) || (defaultSortDirection !== seedSortDirection)
    if (data === seedData && !seedSortingChanged) {
      return
    }

    if (seedSortingChanged) {
      setSortBy(defaultSortBy)
      setSortDirection(defaultSortDirection)
    }

    setSeedSortBy(defaultSortBy)
    setSeedSortDirection(defaultSortDirection)
    setSeedData(data)
    setProcessedData(sortData({
      data, sortBy, sortDirection, columns,
    }, {
      getSortedData, sortedDataPostProcessor,
    }))

  }, [defaultSortBy, defaultSortDirection, data, columns, getSortedData, seedData, seedSortBy, seedSortDirection, sortBy, sortDirection, sortedDataPostProcessor])

  const onSort = ({
    sortDirection: postSortDirection,
    defaultSortDirection: propDefaultSortDirection,
    sortBy: postSortBy,
  }) => {
    const direction = sortDirection || propDefaultSortDirection

    if (postSortBy === sortBy && postSortDirection === direction) {
      return
    }

    setSortBy(postSortBy)
    setSortDirection(postSortDirection)
    setProcessedData(sortData({
      data,
      columns,
      sortBy: postSortBy,
      sortDirection: postSortDirection,
    }, {
      getSortedData, sortedDataPostProcessor,
    }))
  }

  return (
    <div className='vt-container'>
      <div className='hfui-table'>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              height={height}
              width={width}
              rowHeight={rowHeight}
              rowGetter={({ index }) => processedData[index]}
              rowCount={processedData.length}
              onRowClick={onRowClick}
              headerHeight={headerHeight}
              disableHeader={false}
              gridStyle={{ outline: 'none' }}
              sort={onSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
            >
              {columns.map((c = {}) => (
                <Column
                  key={c.dataKey}
                  dataKey={c.dataKey}
                  {...c}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

VirtualTable.propTypes = {
  data: PropTypes.array, // eslint-disable-line
  columns: PropTypes.array, // eslint-disable-line
  rowHeight: PropTypes.number,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  sortedDataPostProcessor: PropTypes.func,
  getSortedData: PropTypes.func,
  defaultSortBy: PropTypes.string,
  defaultSortDirection: PropTypes.oneOf(['ASC', 'DESC']),
}

VirtualTable.defaultProps = {
  data: [],
  columns: [],
  rowHeight: 22,
  headerHeight: 32,
  defaultSortBy: 'id',
  defaultSortDirection: 'ASC',
  onRowClick: () => { },
  sortedDataPostProcessor: () => { },
  getSortedData: getSortedDataHelper, // NOTE: useful default
}

export default React.memo(VirtualTable)
