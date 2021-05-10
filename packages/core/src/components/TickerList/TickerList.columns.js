import React from 'react'

import { getColors } from '../../common/classes'
import { KEYS } from './TickerList.constants'

// label: column header
// key: column key
// defaultSortAsc: default sort direction to use when column sort icon is clicked
// cellStyle : td, th style
// headerCellClassName: th classname
// renderer: for content to be renderered inside td
const getColumns = ({ t } = {}) => [{
  label: t('tickerlist:pair'),
  key: KEYS.BASE_CCY,
  defaultSortAsc: true,
  cellStyle: { width: '26%', textAlign: 'left', wordBreak: 'break-all' },
  headerCellClassName: 'pair',
  renderer: ({ baseCcy, quoteCcy }) => (
    <span>
      {baseCcy}
      /
      <span className='price-unit'>{quoteCcy}</span>
    </span>
  ),
}, {
  label: t('tickerlist:last_price'),
  key: KEYS.LAST_PRICE,
  defaultSortAsc: false,
  cellStyle: { width: '23%', textAlign: 'left' },
  headerCellClassName: 'last-price',
}, {
  label: t('tickerlist:24h_change'),
  key: KEYS.CHANGE_PERC,
  defaultSortAsc: false,
  cellStyle: { width: '15%', textAlign: 'right' },
  renderer: ({ formattedValue, value }) => (
    <span className={getColors(value, { strike: 0, includeStrike: true })}>
      {formattedValue}
    </span>
  ),
}, {
  label: t('tickerlist:volume'),
  key: KEYS.VOLUME,
  defaultSortAsc: false,
  cellStyle: { width: '29%', textAlign: 'right' },
}]

export default getColumns
