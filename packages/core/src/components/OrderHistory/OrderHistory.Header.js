import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import Truncate from '../ui/Truncate'

const OrderHHeader = (props) => {
  const { columns, rowMapping } = props

  return (
    <thead>
      <tr>
        {columns.map(({
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
