/* eslint-disable react/jsx-props-no-spreading */
import cx from 'classnames'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, { useState, useEffect, memo } from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'

import * as Classes from '../../../common/classes'
import { getSortedData as getSortedDataHelper, sortData, processColumns } from './VirtualTable.helpers'

const VirtualTable = ({
  data, columns, onRowClick, rowHeight, headerHeight, defaultSortBy, defaultSortDirection,
  getSortedData, sortedDataPostProcessor, className, interactive, striped, headerClassName,
  noRowsRenderer, relational,
}) => {
  // const [ref, { width: containerWidth }] = useSize()
  const [containerWidth, setContainerWidth] = useState(0)
  const [sortBy, setSortBy] = useState(defaultSortBy)
  const [sortDirection, setSortDirection] = useState(defaultSortDirection)
  const [processedData, setProcessedData] = useState([])
  const [processedColumns, setProcessedColumns] = useState([])

  const classes = cx(Classes.VIRTUAL_TABLE_CONTAINER, className)

  useEffect(() => {
    if (relational) {
      const cols = processColumns(containerWidth, columns)
      setProcessedColumns(cols)
    } else {
      setProcessedColumns(columns)
    }
  }, [containerWidth, columns, relational])

  useEffect(() => {
    let cols = columns

    if (relational) {
      cols = processColumns(containerWidth, columns)
      setProcessedColumns(cols)
    } else {
      setProcessedColumns(columns)
    }

    setProcessedData(sortData({
      data,
      sortBy,
      sortDirection,
      columns: cols,
    }, {
      getSortedData, sortedDataPostProcessor,
    }))
  }, [data, columns, getSortedData, sortBy, sortDirection, sortedDataPostProcessor, relational, containerWidth])

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
      columns: processedColumns,
      sortBy: postSortBy,
      sortDirection: postSortDirection,
    }, {
      getSortedData, sortedDataPostProcessor,
    }))
  }

  return (
    <div className={classes}>
      <div className={Classes.VIRTUAL_TABLE}>
        <AutoSizer onResize={({ width }) => setContainerWidth(width)}>
          {({ width, height }) => (
            <Table
              height={height}
              width={width}
              rowHeight={rowHeight}
              rowGetter={({ index }) => _get(processedData, index)}
              rowCount={_size(processedData)}
              rowClassName={cx({
                interactive,
                striped,
              })}
              onRowClick={onRowClick}
              headerHeight={headerHeight}
              disableHeader={false}
              sort={onSort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              headerClassName={headerClassName}
              noRowsRenderer={noRowsRenderer}
            >
              {_map(processedColumns, (c = {}) => (
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
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  interactive: PropTypes.bool,
  striped: PropTypes.bool,
  noRowsRenderer: PropTypes.func,
  relational: PropTypes.bool,
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
  getSortedData: getSortedDataHelper,
  className: null,
  headerClassName: null,
  interactive: false,
  striped: false,
  noRowsRenderer: () => { },
  relational: false,
}

export default memo(VirtualTable)
