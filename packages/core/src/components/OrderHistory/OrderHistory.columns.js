import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import React from 'react'

import * as Classes from '../../common/classes'
import { KEYS } from './OrderHistory.constants'

// key: column key
// label: column header
// cellStyle : td, th style
// headerCellClassName: th classname
// cellClassName: td classname
// renderer: for content to be renderered inside td
// truncate: for cell content to be truncated with ellipsis
const getColumns = (args = {}) => {
  const { t, isMobile } = args

  return [
    {
      key: KEYS.ICON,
      label: '',
      cellStyle: { width: '3%' },
      cellClassName: 'intent',
      truncate: false,
      renderer: ({
        orderTitle, colorClass, isSellOrder,
      }) => {
        if (isMobile) {
          return <span className={isSellOrder ? 'sell' : 'buy'} />
        }

        return (
          <span title={orderTitle}>
            <FontAwesomeIcon
              icon={faCircle}
              className={colorClass}
              size='sm'
            />
          </span>
        )
      },
    },
    {
      key: KEYS.PAIR,
      label: t('pair'),
      cellStyle: { width: isMobile ? '17%' : '12%' },
      cellClassName: 'pair',
      truncate: true,
      renderer: ({
        formattedValue, type,
      }) => (
        <>
          {formattedValue}
          {isMobile && (
            <span className='mobile-order-type'>
              {type}
            </span>
          )}
        </>
      ),
    },
    ...(isMobile ? [] : [
      {
        key: KEYS.TYPE,
        label: t('type'),
        cellStyle: { width: '10%' },
        truncate: true,
      },
    ]),
    {
      key: KEYS.AMOUNT,
      label: t('amount'),
      cellStyle: { width: '15%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
      truncate: true,
    },
    {
      key: KEYS.BASE_CCY,
      label: t('ccy'),
      cellStyle: { width: '7%' },
      headerCellClassName: Classes.CENTER,
      cellClassName: Classes.CENTER,
      truncate: true,
    },
    {
      key: KEYS.PRICE,
      label: t('price'),
      cellStyle: { width: isMobile ? '20%' : '12.5%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
      truncate: true,
    },
    {
      key: KEYS.PRICE_AVERAGE,
      label: t('average_price'),
      cellStyle: { width: isMobile ? '18%' : '12.5%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
      truncate: true,
    },
    {
      key: KEYS.STATUS,
      label: t('status'),
      cellStyle: { width: isMobile ? '20%' : '13%' },
      headerCellClassName: isMobile ? Classes.RIGHT_TO_LEFT : Classes.CENTER,
      cellClassName: cx('status', isMobile ? Classes.RIGHT_TO_LEFT : Classes.CENTER),
      truncate: true,
      renderer: ({
        formattedValue, placed,
      }) => (
        <>
          {formattedValue}
          {isMobile && (
            <span className='mobile-order-placed'>
              {placed}
            </span>
          )}
        </>
      ),
    },
    ...(isMobile ? [] : [
      {
        key: KEYS.PLACED,
        label: t('placed'),
        cellStyle: { width: '15%' },
        truncate: true,
      },
    ]),
  ]
}

export default getColumns
