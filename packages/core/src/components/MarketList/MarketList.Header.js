import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import { Button } from '../ui'
import { ACTION_TYPES } from './MarketList.constants'

const MarketListHeader = (props) => {
  const {
    sortBy,
    sortAscending,
    dispatch,
    columns,
  } = props

  const icon = (
    <FontAwesomeIcon size='xs' icon={sortAscending ? faCaretUp : faCaretDown} />
  )

  const handleSort = (key, label) => {
    if (label) {
      dispatch({
        type: ACTION_TYPES.SET_SORT,
        payload: {
          sortBy: key,
          sortAscending: sortBy === key ? !sortAscending : false,
        },
      })
    }
  }

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
            onClick={() => handleSort(key, label)}
            style={cellStyle}
            className={headerCellClassName}
          >
            {label && (
              <Button>
                <div className='table-header'>
                  <div className='table-header__text'>{label}</div>
                  {key === sortBy ? icon
                    : (
                      <div className='table-header__default-icon'>
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          size='xs'
                        />
                        <FontAwesomeIcon icon={faCaretUp} size='xs' />
                      </div>
                    )}
                </div>
              </Button>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}

MarketListHeader.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortAscending: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default memo(MarketListHeader, _isEqual)
