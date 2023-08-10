/* eslint-disable react/jsx-props-no-spreading */
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _get from 'lodash/get'
import React from 'react'

import BalancesAmount from './Balances.Amount/Balances.Amount'
import { KEYS } from './Balances.constants'
import * as Classes from '../../common/classes'
import { getNiceWalletName } from '../../common/utils'
import { i18n } from '../../i18n'
import { Button, Tooltip } from '../ui'

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

const getColumns = ({ showTransfer, handleDepositClick, handleWithdrawClick }) => [{
  label: i18n.t('balances:name'),
  dataKey: KEYS.NAME,
  width: 130,
  flexGrow: 1,
}, {
  label: getNiceWalletName('exchange'),
  dataKey: KEYS.EXCHANGE,
  headerClassName: Classes.RIGHT_TO_LEFT,
  width: 180,
  flexGrow: 1,
  className: `${Classes.RIGHT_TO_LEFT} is-monospaced`,
  renderer: ({ rowData }) => <AmountRenderer data={rowData} walletKey={KEYS.EXCHANGE_KEY} />,
},
...(!showTransfer ? []
  : [{
    label: '',
    dataKey: '',
    width: 100,
    flexGrow: 0.1,
    headerClassName: Classes.RIGHT_TO_LEFT,
    className: Classes.RIGHT_TO_LEFT,
    renderer: ({ rowData }) => (
      <div className='actions'>
        <Tooltip content={i18n.t('balances:deposit')}>
          <Button minimal small onClick={() => handleDepositClick(rowData)}>
            <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </Tooltip>
        <Tooltip content={i18n.t('balances:withdraw')}>
          <Button minimal small onClick={() => handleWithdrawClick(rowData)}>
            <FontAwesomeIcon icon={faArrowUp} />
          </Button>
        </Tooltip>
      </div>
    ),
  }]),
]

export default getColumns
