/* eslint-disable react/jsx-props-no-spreading */
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _get from 'lodash/get'
import React from 'react'

import * as Classes from '../../common/classes'
import { getNiceWalletName } from '../../common/utils'
import { i18n } from '../../i18n'
import { Button, Tooltip } from '../ui'
import BalancesAmount from './Balances.Amount/Balances.Amount'
import { KEYS } from './Balances.constants'

const AmountRenderer = ({ data, walletKey }) => {
  const total = _get(data, [walletKey, KEYS.TOTAL], 0)
  const available = _get(data, [walletKey, KEYS.AVAILABLE], 0)
  return (
    <BalancesAmount
      total={total}
      available={available}
    />
  )
}

const getColumns = (showTransfer) => [{
  getLabel: () => i18n.t('balances:name'),
  dataKey: KEYS.NAME,
  isSortable: true,
  defaultSortAsc: true,
}, {
  getLabel: () => getNiceWalletName('exchange'),
  dataKey: KEYS.EXCHANGE,
  isSortable: true,
  defaultSortAsc: false,
  headerClassName: Classes.RIGHT_TO_LEFT,
  cellClassName: Classes.RIGHT_TO_LEFT,
  renderer: ({ data }) => <AmountRenderer data={data} walletKey={KEYS.EXCHANGE_KEY} />,
},
...(!showTransfer ? []
  : [{
    getLabel: () => '',
    dataKey: '',
    isSortable: false,
    headerClassName: Classes.RIGHT_TO_LEFT,
    cellClassName: Classes.RIGHT_TO_LEFT,
    renderer: ({ data, handleDepositClick, handleWithdrawClick }) => (
      <div className='actions'>
        <Tooltip content={i18n.t('balances:deposit')}>
          <Button minimal small onClick={() => handleDepositClick(data)}>
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </Tooltip>
        <Tooltip content={i18n.t('balances:withdraw')}>
          <Button minimal small onClick={() => handleWithdrawClick(data)}>
            <FontAwesomeIcon icon={faArrowUp} />
          </Button>
        </Tooltip>
      </div>
    ),
  }]),
]

export default getColumns
