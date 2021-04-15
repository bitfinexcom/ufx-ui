import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { getOrderedColumns, getVisibleColumns } from '../../utils/data-mapping'
import Truncate from '../ui/Truncate'

const OrderHHeader = (props) => {
  const { columns, rowMapping } = props

  const visibleColumns = getVisibleColumns(columns, rowMapping)
  const orderedColumns = getOrderedColumns(visibleColumns, rowMapping)

  return (
    <thead>
      <tr>
        {orderedColumns.map(({
          key,
          label,
          headerCellClassName,
          cellStyle,
        }) => {
          const truncate = _get(rowMapping, [key, 'truncate'], false)

          return (
            <th
              key={key}
              style={cellStyle}
              className={headerCellClassName}
            >
              {truncate ? <Truncate>{label}</Truncate> : label}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

OrderHHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(OrderHHeader)
