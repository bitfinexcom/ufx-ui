import cx from 'classnames'
import _get from 'lodash/get'
import _isNumber from 'lodash/isNumber'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'
import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, {
  useState, memo, useMemo, useCallback, forwardRef,
} from 'react'
import {
  AutoSizer,
  Table,
  Column,
  defaultTableRowRenderer,
} from 'react-virtualized'

import {
  getSortedData as getSortedDataHelper,
  sortData,
  columnHeaderRenderer as _columnHeaderRenderer,
} from './VirtualTable.helpers'
import * as Classes from '../../../common/classes'

const VirtualTable = forwardRef((props, ref) => {
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
    onScrollToBottom,
    tableState,
    updateTableState,
    ...rest
  } = props

  const initialColumnsWidthState = useMemo(
    () => _reduce(
      columns,
      (acc, col) => {
        const { width = 150, dataKey } = col

        acc[dataKey] = Number(width)
        return acc
      },
      {},
    ),
    [columns],
  )

  const {
    columnsWidthState: savedColumnsWidthState,
    sortBy: savedSortBy,
    sortDirection: savedSortDirection,
  } = tableState

  const [columnsWidthState, setColumnsWidthState] = useState(
    savedColumnsWidthState || initialColumnsWidthState,
  )
  const [sortBy, setSortBy] = useState(savedSortBy || defaultSortBy)
  const [sortDirection, setSortDirection] = useState(
    savedSortDirection || defaultSortDirection,
  )

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
    updateTableState({
      sortDirection: postSortDirection,
      sortBy: postSortBy,
    })
  }

  const onScrollInternal = (message) => {
    if (!message) {
      return
    }
    const { clientHeight, scrollHeight, scrollTop } = message
    const SCROLL_TO_BOTTOM_TRIGGER_THRESHOLD = 0
    if (
      clientHeight + scrollTop + SCROLL_TO_BOTTOM_TRIGGER_THRESHOLD
      >= scrollHeight
    ) {
      onScrollToBottom()
    }
  }

  const columnHeaderRenderer = useCallback(
    (columnParams) => _columnHeaderRenderer(
      columnParams,
      setColumnsWidthState,
      updateTableState,
    ),
    [updateTableState],
  )

  return (
    <div className={classes}>
      <div className={Classes.VIRTUAL_TABLE}>
        <AutoSizer>
          {({ width, height }) => (
            <Table
              ref={ref}
              height={height}
              width={
                _isNumber(minTableWidth) && width < minTableWidth
                  ? minTableWidth
                  : width
              }
              onScroll={onScrollInternal}
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
              {...rest} // eslint-disable-line react/jsx-props-no-spreading
            >
              {_map(columns, (c) => (
                <Column
                  key={c.dataKey}
                  dataKey={c.dataKey}
                  headerRenderer={columnHeaderRenderer}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...c}
                  width={columnsWidthState[c.dataKey]}
                />
              ))}
            </Table>
          )}
        </AutoSizer>
      </div>
    </div>
  )
})

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
       * Width of column, in px
       */
      width: PropTypes.number,
      /**
       * Custom method of render column's data
       */
      cellRenderer: PropTypes.func,
      /**
       * CSS Flex-grow index of column element
       */
      flexGrow: PropTypes.number,
      /**
       * Style object of header
       */
      headerStyle: PropTypes.objectOf(PropTypes.string),
      /**
       * Style object of column
       */
      style: PropTypes.objectOf(PropTypes.string),
      /**
       * ClassName of column's header
       */
      headerClassName: PropTypes.string,
    }),
  ), // eslint-disable-line
  /**
   * The height of row, in px
   */
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
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
  /**
   * Callback to be invoked when more rows must be loaded
   */
  onScrollToBottom: PropTypes.func,
  /**
   * The object with external state of the table
   */
  // eslint-disable-next-line react/forbid-prop-types
  tableState: PropTypes.object,
  /**
   * Callback, which updates an external state of the table
   */
  updateTableState: PropTypes.func,
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
  onScrollToBottom: () => {},
  tableState: {},
  updateTableState: () => {},
}

export default memo(VirtualTable)
