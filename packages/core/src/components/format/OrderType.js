import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React from 'react'

import { Tooltip } from '../ui'
import Truncate from '../ui/Truncate'

export const ORDER_TYPES = {
  EXCHANGE_LIMIT: 'EXCHANGE LIMIT',
  EXCHANGE_MARKET: 'EXCHANGE MARKET',
}

const formatType = (type) => type.split('_').join(' ')

const getTypes = allTypes => allTypes.split(';')

const OrderType = (props) => {
  const { children } = props

  const renderTooltip = () => {
    const types = getTypes(children)

    return (
      <div>
        {types.map(t => (
          <div key={t}>{formatType(t)}</div>
        ))}
      </div>
    )
  }

  const types = getTypes(children)

  if (_size(types) === 0) {
    return null
  }

  const type = formatType(types[0])

  if (_size(types) === 1) {
    return <Truncate>{type}</Truncate>
  }

  return (
    <>
      {type}

      {types.length > 1 && (
        <>
          {' '}
          <Tooltip content={renderTooltip()}>
            <small>...</small>
          </Tooltip>
        </>
      )}
    </>
  )
}

OrderType.propTypes = {
  /**
   * Children of OrderType
   */
  children: PropTypes.string.isRequired,
}

export default OrderType
