/* eslint-disable import/prefer-default-export */
import React from 'react'

import * as utils from '../../common/utils'

export const rowRenderer = ({
  className,
  style,
  columns,
  onRowClick: _onRowClick,
  key,
  rowData,
}) => {
  const onRowClick = () => _onRowClick({ rowData })

  return (
    <div
      role='row'
      tabIndex='0'
      onClick={onRowClick}
      onKeyPress={utils.handleKeyboardEvent(['Enter'], onRowClick)}
      className={className}
      style={style}
      key={key}
    >
      {columns}
    </div>
  )
}
