import React from 'react'

export const data = [
  {
    id: 64337708488,
    cid: 1620378628862,
    symbol: 'tTESTBTC:TESTUSDT',
    created: 1620387948463,
    amount: -0.002,
    originalAmount: -0.002,
    type: 'EXCHANGE STOP',
    status: 'ACTIVE',
    price: 60000,
  },
  {
    id: 64337708489,
    cid: 1620378628863,
    symbol: 'tTESTBTC:TESTUSDT',
    created: 1620387948468,
    amount: -0.002,
    originalAmount: -0.002,
    type: 'EXCHANGE STOP',
    status: 'ACTIVE',
    price: 60000,
  },
  {
    id: 64337708490,
    cid: 1620378628864,
    symbol: 'tTESTBTC:TESTUSDT',
    created: 1620387948476,
    amount: -0.002,
    originalAmount: -0.002,
    type: 'LIMIT',
    status: 'ACTIVE',
    price: 60000,
  },
  {
    id: 64337708491,
    cid: 1620378628865,
    symbol: 'tBTC:USDT',
    created: 1620387948522,
    amount: -0.002,
    originalAmount: -0.002,
    type: 'EXCHANGE STOP',
    status: 'ACTIVE',
    price: 60000,
  },
]

export const columns = [{
  label: 'Symbol',
  dataKey: 'symbol',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.symbol,
}, {
  label: 'Type',
  dataKey: 'type',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.type,
}, {
  label: 'Amount',
  dataKey: 'amount',
  width: 120,
  cellRenderer: ({ rowData = {} }) => (rowData.amount < 0 // eslint-disable-line
    ? <span className='hfui-red'>{rowData.amount}</span>
    : <span className='hfui-green'>{rowData.amount}</span>
  ),
}, {
  label: 'Price',
  dataKey: 'price',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.price,
}, {
  label: 'Status',
  dataKey: 'status',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.status,
}, {
  label: 'Actions',
  dataKey: 'cid',
  width: 100,
  cellRenderer: () => (
    <div className='icons-cell'>
      <i
        role='button'
        aria-label='Cancel'
        tabIndex={0}
        className='icon-cancel'
      />
    </div>
  ),
  disableSort: true,
}]
