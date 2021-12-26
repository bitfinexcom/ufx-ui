import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../common/props'
import * as utils from '../../common/utils'
import { KEYS } from './MarketList.constants'

const MarketListRow = (props) => {
  const {
    data,
    isFav,
    toggleFav,
    onRowClick,
    getMappedValue,
    columns,
    customMapping,
  } = props
  const getDisplayValue = getMappedValue(data)

  const quoteCcy = getDisplayValue(KEYS.QUOTE_CCY)

  const handleRowClick = () => {
    const id = getDisplayValue(KEYS.ID)
    onRowClick(id)
  }

  return (
    <tr
      tabIndex='0'
      onClick={handleRowClick}
      onKeyPress={utils.handleKeyboardEvent(['Enter'], handleRowClick)}
    >
      {columns.map(({
        dataKey,
        cellClassName,
        cellStyle,
        renderer: defRenderer,
      }) => {
        const formattedValue = getDisplayValue(dataKey)
        const value = getDisplayValue(dataKey, false)
        const renderer = _get(customMapping, [dataKey, 'renderer'], defRenderer)

        return (
          <td
            key={dataKey}
            className={cellClassName}
            style={cellStyle}
          >
            {renderer ? renderer({
              value,
              formattedValue,
              data,
              isFav,
              toggleFav,
              quoteCcy,
            }) : formattedValue}
          </td>
        )
      })}
    </tr>
  )
}

MarketListRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isFav: PropTypes.bool,
  toggleFav: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  getMappedValue: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  customMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)).isRequired,
}

MarketListRow.defaultProps = {
  isFav: false,
}

export default memo(MarketListRow)
