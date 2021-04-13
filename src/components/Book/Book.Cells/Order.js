import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _get from 'lodash/get'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Tooltip, CooldownButton } from '../../ui'
import { CANCEL_TIMEOUT_MS } from '../Book.constants'

const OrdersContent = (props) => {
  const {
    orders,
    handleCancel,
  } = props
  const { t } = useTranslation('book')

  if (!orders.length) {
    return null
  }

  return orders.map((order) => {
    const {
      amount,
      type,
      price,
      id,
    } = order

    const onCancelClick = (e) => {
      e.stopPropagation()
      handleCancel(order)
    }

    return (
      <div key={id} className='order-tooltip'>
        <span>
          {`${type} ${amount} at ${price}`}
        </span>
        <CooldownButton
          title={t('cancel_order')}
          minimal
          onClick={onCancelClick}
          timeoutMs={CANCEL_TIMEOUT_MS}
        ><FontAwesomeIcon icon={faTimes} />
        </CooldownButton>
      </div>
    )
  })
}

const Order = (props) => {
  const {
    marks,
    price,
    isBid: bid,
    cancelOrder,
  } = props

  const filtered = _get(marks, price, [])
  const count = filtered.length

  const handleCancel = (order = {}) => {
    const { id } = order
    cancelOrder(
      id,
      order,
    )
  }

  return (
    <div className='order'>
      {!!count
        && (
          <Tooltip
            persistent
            content={(
              <OrdersContent
                handleCancel={handleCancel}
                orders={filtered}
              />
            )}
          >
            <span className={cx({ bid })}>{count}</span>
          </Tooltip>
        )}
    </div>
  )
}

Order.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  marks: PropTypes.object,
  price: PropTypes.number.isRequired,
  isBid: PropTypes.bool,
  cancelOrder: PropTypes.func,
}

Order.defaultProps = {
  marks: {},
  isBid: false,
  cancelOrder: () => { },
}

export default memo(Order)
