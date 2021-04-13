import PropTypes from 'prop-types'
import React, { memo } from 'react'

const SideHeader = (props) => {
  const {
    isBid,
    isVertical,
    columns,
  } = props

  const s = {
    flexDirection: (isBid || isVertical) ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
  }

  if (isVertical && isBid) {
    return null
  }

  return (
    <div style={s} className='header'>
      {columns.map(({
        key,
        label,
        headerCellClassName,
        cellStyle,
      }) => (
        <div
          key={key}
          style={cellStyle}
          className={headerCellClassName}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

SideHeader.propTypes = {
  isBid: PropTypes.bool,
  isVertical: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

SideHeader.defaultProps = {
  isBid: false,
  isVertical: false,
}

export default memo(SideHeader)
