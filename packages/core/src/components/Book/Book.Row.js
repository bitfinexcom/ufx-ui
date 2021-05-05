import { getValue } from '@ufx-ui/utils'
import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../common/props'
import * as utils from '../../common/utils'
import { KEYS } from './Book.constants'

const BookRow = (props) => {
  const {
    total,
    isBid,
    decimals,
    marks,
    cancelOrder,
    onRowClick,
    isVertical,
    data,
    rowMapping: customMapping,
    columns,
  } = props

  const getDisplayValue = getValue({
    customMapping,
    data,
  })

  const price = getDisplayValue(KEYS.PRICE)

  const handleRowClick = (e) => {
    e.stopPropagation()
    onRowClick(price)
  }

  const className = cx('row', {
    'row--reversed': !isBid && !isVertical,
  })

  return (
    <div
      key={`${price}`}
      className={className}
      tabIndex='0'
      role='button'
      onClick={handleRowClick}
      onKeyPress={utils.handleKeyboardEvent(['Enter'], handleRowClick)}
    >
      {columns.map(({
        key,
        cellClassName,
        cellStyle,
        renderer: defRenderer,
      }) => {
        const formattedValue = getDisplayValue(key)
        const value = getDisplayValue(key, false)
        const renderer = _get(customMapping, [key, 'renderer'], defRenderer)

        return (
          <div
            key={key}
            className={cellClassName}
            style={cellStyle}
          >
            {renderer ? renderer({
              value,
              formattedValue,
              decimals,
              total,
              marks,
              price,
              isBid,
              cancelOrder,
            }) : formattedValue}
          </div>
        )
      })}
    </div>
  )
}

BookRow.propTypes = {
  total: PropTypes.number.isRequired,
  isBid: PropTypes.bool.isRequired,
  decimals: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  marks: PropTypes.object,
  cancelOrder: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  isVertical: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  rowMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

BookRow.defaultProps = {
  marks: {},
  isVertical: false,
  data: {},
  rowMapping: {},
}

export default memo(BookRow)
