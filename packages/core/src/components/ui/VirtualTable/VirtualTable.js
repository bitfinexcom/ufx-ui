import cx from 'classnames'
import _get from 'lodash/get'
import _isNumber from 'lodash/isNumber'
import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, { useState, memo } from 'react'
import {
  AutoSizer,
  Table,
  Column,
  defaultTableRowRenderer,
} from 'react-virtualized'

import * as Classes from '../../../common/classes'
import {
  getSortedData as getSortedDataHelper,
  sortData,
} from './VirtualTable.helpers'

const VirtualTable = (props) => {
  const {
    data,
    columns,
    onRowClick,
    rowHeight,
    headerHeight,
    defaultSortBy,
    defaultSortDirection,
    getSortedData,
    sortedDataPostProcessor,
    className,
    interactive,
    striped,
    headerClassName,
    noRowsRenderer,
    minTableWidth,
    rowRenderer,
  } = props
  const [sortBy, setSortBy] = useState(defaultSortBy)
  const [sortDirection, setSortDirection] = useState(defaultSortDirection)

  const classes = cx(Classes.VIRTUAL_TABLE_CONTAINER, className)

  const processedData = sortData(
    {
      data,
      columns,
      sortBy,
      sortDirection,
    },
    { getSortedData, sortedDataPostProcessor },
  )

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
  }

  return (
    <div className={classes}>
      <div className={Classes.VIRTUAL_TABLE}>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              height={height}
              width={
                _isNumber(minTableWidth) && width < minTableWidth
                  ? minTableWidth
                  : width
              }
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
              rowRenderer={rowRenderer}
            >
              {columns.map((c = {}) => (
                <Column
                  key={c.dataKey}
                  dataKey={c.dataKey}
                  // eslint-disable-next-line react/jsx-props-no-spreading
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
  /**
   * Data, which is rendering in VirtualTable
   */
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /**
   * Array with all columns config
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Name, which is showing
       */
      label: PropTypes.string,
      /**
       * Key from object of data
       */
      dataKey: PropTypes.string,
      /**
       * Width of colunm, in px
       */
      width: PropTypes.number,
      /**
       * Custom method of render column's data
       */
      cellRenderer: PropTypes.func,
    }),
  ), // eslint-disable-line
  /**
   * The height of row, in px
   */
  rowHeight: PropTypes.number,
  /**
   * The height of header, in px
   */
  headerHeight: PropTypes.number,
  /**
   * Callback invoked when a user clicks on a table row.
   */
  onRowClick: PropTypes.func,
  /**
   *  Function, which is to apply customisation or further sorting logic on sorted data used for VirtualTable
   */
  sortedDataPostProcessor: PropTypes.func,
  /**
   * Returns a sorted copy of the provided dataset; values are cast to strings
   * before comparison via localeCompare(). The transformers map is optional,
   * and can be used to process field values before casting/comparison.
   */
  getSortedData: PropTypes.func,
  /**
   * Default value of table dataKey, which is sorted by
   */
  defaultSortBy: PropTypes.string,
  /**
   * Default type of sorted direction
   */
  defaultSortDirection: PropTypes.oneOf(['ASC', 'DESC']),
  /**
   * /**
   * The className of the Table.
   */
  className: PropTypes.string,
  /**
   * The className of the Table's header
   */
  headerClassName: PropTypes.string,
  /**
   * If true, the rows of the Table will have hover/focus and active interactions.
   */
  interactive: PropTypes.bool,
  /**
   * If true, adjacent rows have a different colors
   */
  striped: PropTypes.bool,
  /**
   * Callback used to render placeholder content when :rowCount is 0
   */
  noRowsRenderer: PropTypes.func,
  /**
   * Responsible for rendering a table row given an array of columns
   */
  rowRenderer: PropTypes.func,
  /**
   * The minimum width the table can shrink by
   */
  minTableWidth: PropTypes.number,
}

VirtualTable.defaultProps = {
  data: [],
  columns: [],
  rowHeight: 22,
  headerHeight: 32,
  defaultSortBy: 'id',
  defaultSortDirection: 'ASC',
  onRowClick: () => {},
  sortedDataPostProcessor: () => {},
  getSortedData: getSortedDataHelper,
  className: null,
  headerClassName: null,
  interactive: false,
  striped: false,
  noRowsRenderer: () => {},
  rowRenderer: defaultTableRowRenderer,
  minTableWidth: null,
}

export default memo(VirtualTable)
