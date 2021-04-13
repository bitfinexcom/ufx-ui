import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { DATA_MAPPING } from '../../common/props'
import * as utils from '../../common/utils'
import { getValue } from '../../utils/data-mapping'
import { Button } from '../ui'
import { KEYS, MAPPING } from './TickerList.constants'

const TickerListRow = (props) => {
  const {
    data,
    isFav,
    toggleFav,
    onRowClick,
    dataMapping: customMapping,
    columns,
  } = props

  const getDisplayValue = getValue({
    mapping: MAPPING,
    customMapping,
    data,
  })

  const baseCcy = getDisplayValue(KEYS.BASE_CCY)
  const quoteCcy = getDisplayValue(KEYS.QUOTE_CCY)
  const id = getDisplayValue(KEYS.ID)

  const handleRowClick = () => {
    onRowClick(id, data)
  }

  const handleFavIconClick = (e) => {
    e.stopPropagation()
    toggleFav(id)
  }

  return (
    <tr
      tabIndex='0'
      onClick={handleRowClick}
      onKeyPress={utils.handleKeyboardEvent(['Enter'], handleRowClick)}
    >
      <td className='fav-col'>
        <Button
          minimal
          onClick={handleFavIconClick}
        >
          <FontAwesomeIcon
            icon={isFav ? faStar : faStarEmpty}
            className='fav-icon'
          />
        </Button>
      </td>
      {columns.map(({ key, renderer: defRenderer, cellStyle }) => {
        const formattedValue = getDisplayValue(key)
        const value = getDisplayValue(key, false)
        const renderer = _get(customMapping, [key, 'renderer'], defRenderer)

        return (
          <td key={key} style={cellStyle}>
            {renderer ? renderer({
              value,
              formattedValue,
              data,
              baseCcy,
              quoteCcy,
            }) : formattedValue}
          </td>
        )
      })}
    </tr>
  )
}

TickerListRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  isFav: PropTypes.bool.isRequired,
  toggleFav: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  dataMapping: PropTypes.objectOf(PropTypes.shape(DATA_MAPPING)),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

TickerListRow.defaultProps = {
  dataMapping: {},
}

export default memo(TickerListRow)
