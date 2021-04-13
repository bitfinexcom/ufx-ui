import PropTypes from 'prop-types'
import React, { memo } from 'react'

const OrdersHeader = (props) => {
  const { columns } = props

  return (
    <thead>
      <tr>
        {columns.map(({
          key,
          label,
          headerCellClassName,
          cellStyle,
        }) => (
          <th
            key={key}
            style={cellStyle}
            className={headerCellClassName}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

OrdersHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(OrdersHeader)
