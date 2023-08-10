import PropTypes from 'prop-types'
import React, { memo } from 'react'

const TradesHeader = (props) => {
  const { columns } = props

  return (
    <thead>
      <tr>
        {columns.map(({
          dataKey,
          label,
          headerCellClassName,
          cellStyle,
        }) => (
          <th
            key={dataKey}
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

TradesHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(TradesHeader)
