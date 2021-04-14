import PropTypes from 'prop-types'
import React, { memo } from 'react'

import Truncate from '../ui/Truncate'

const OrderHHeader = (props) => {
  const { columns } = props

  return (
    <thead>
      <tr>
        {columns.map(({
          key,
          label,
          headerCellClassName,
          cellStyle,
          truncate,
        }) => (
          <th
            key={key}
            style={cellStyle}
            className={headerCellClassName}
          >
            {truncate ? <Truncate>{label}</Truncate> : label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

OrderHHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(OrderHHeader)
