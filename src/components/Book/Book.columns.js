import React from 'react'

import { Amount, Price, Order } from './Book.Cells'
import { KEYS } from './Book.constants'
import { size } from './Book.styles'

// key: column key
// label: column header
// renderer: for content to be renderered inside td
const getColumns = (args = {}) => {
  const { t } = args

  return [
    {
      key: KEYS.ORDER_COUNT,
      label: '',
      cellStyle: size.XS,
      renderer: ({
        marks, price, isBid, cancelOrder,
      }) => (
        <Order
          marks={marks}
          price={price}
          isBid={isBid}
          cancelOrder={cancelOrder}
        />
      ),
    }, {
      key: KEYS.COUNT,
      label: t('book:count'),
      cellStyle: size.S,
    }, {
      key: KEYS.AMOUNT,
      label: t('book:amount'),
      cellStyle: size.L,
      renderer: ({ value }) => (<Amount data={value} />),
    }, {
      key: KEYS.TOTAL,
      label: t('book:total'),
      cellStyle: size.L,
      renderer: ({ total }) => (<Amount data={total} />),
    }, {
      key: KEYS.PRICE,
      label: t('book:price'),
      cellStyle: size.L,
      renderer: ({ value, decimals }) => (<Price data={value} decimals={decimals} />),
    },
  ]
}

export default getColumns
