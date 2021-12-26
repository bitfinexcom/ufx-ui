import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { SORT_CONFIG_PROPS } from '../../hooks/useSortableData'
import { SortButton } from '../ui'

const BalancesHeader = (props) => {
  const {
    sortConfig,
    requestSort,
    columns,
  } = props
  const sortBy = _get(sortConfig, 'key')
  const sortAscending = _get(sortConfig, 'sortAscending')

  return (
    <thead>
      <tr>
        {columns.map(column => {
          const {
            dataKey, sortKey, isSortable, getLabel, headerClassName, defaultSortAsc, cellStyle,
          } = column || {}

          return (
            <th
              key={dataKey}
              className={headerClassName}
              style={cellStyle}
            >
              {!isSortable ? getLabel()
                : (
                  <SortButton
                    content={getLabel()}
                    onSortClick={requestSort}
                    sortBy={sortBy}
                    sortAscending={sortAscending}
                    defaultSortAscending={defaultSortAsc}
                    field={sortKey || dataKey}
                  />
                )}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

BalancesHeader.propTypes = {
  sortConfig: PropTypes.PropTypes.shape(SORT_CONFIG_PROPS).isRequired,
  requestSort: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(BalancesHeader)
