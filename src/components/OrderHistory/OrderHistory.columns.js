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
const getColumns = (args = {}) => {
  const { t, isMobile } = args

  return [
    {
      key: '',
      label: '',
      cellStyle: { width: '3%' },
      cellClassName: 'intent',
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
      },
    ]),
    {
      key: KEYS.AMOUNT,
      label: t('amount'),
      cellStyle: { width: '15%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
    },
    {
      key: KEYS.BASE_CCY,
      label: t('ccy'),
      cellStyle: { width: '7%' },
      headerCellClassName: Classes.CENTER,
      cellClassName: Classes.CENTER,
    },
    {
      key: KEYS.PRICE,
      label: t('price'),
      cellStyle: { width: isMobile ? '20%' : '12.5%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
    },
    {
      key: KEYS.PRICE_AVERAGE,
      label: t('average_price'),
      cellStyle: { width: isMobile ? '18%' : '12.5%' },
      headerCellClassName: Classes.RIGHT_TO_LEFT,
      cellClassName: Classes.RIGHT_TO_LEFT,
    },
    {
      key: KEYS.STATUS,
      label: t('status'),
      cellStyle: { width: isMobile ? '20%' : '13%' },
      headerCellClassName: Classes.CENTER,
      cellClassName: cx('status', Classes.CENTER),
    },
    ...(isMobile ? [] : [
      {
        key: KEYS.PLACED,
        label: t('inactive'),
        cellStyle: { width: '15%' },
      },
    ]),
  ]
}

export default getColumns
