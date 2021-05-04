import PropTypes from 'prop-types'
import React from 'react'

import { Tooltip } from '../ui'

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

  if (types.length === 0) {
    return null
  }

  return (
    <>
      {formatType(types[0])}

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
  children: PropTypes.string.isRequired,
}

export default OrderType
