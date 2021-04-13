import _get from 'lodash/get'
import _mapValues from 'lodash/mapValues'
import _pickBy from 'lodash/pickBy'
import _set from 'lodash/set'
import React, { useState, memo } from 'react'
import { useSelector } from 'react-redux'

import { Balances, BALANCES_KEYS as KEYS } from '../../components'
import { buildPair } from '../../functions/format'
import useTickers from '../../hooks/useTickers'
import { getTradingBalanceWallets } from '../../redux/selectors/balances.selectors'
import { getConversions } from '../../redux/selectors/conversions.selectors'
import { getUIIsPaperTrading } from '../../redux/selectors/UI.selectors'
import { MOVEMENT_TYPES } from '../../utils/movements'
import { convertVolume as convertVolumeFunc } from '../../utils/ticker'

const FIAT_CCY = 'USD'
const PAPER_FIAT_CCY = 'TESTUSD'

const SMALL_BALANCE_THRESHOLD = 0.1

const wallets = [KEYS.EXCHANGE_KEY]

const BalancesContainer = (props) => {
  const { onTransferClick } = props
  const { tickers } = useTickers()

  const [hideSmallBalances, setHideSmallBalances] = useState(false)

  const balances = useSelector(getTradingBalanceWallets)
  const conversions = useSelector(getConversions)

  const convertVolume = convertVolumeFunc(tickers, buildPair, conversions)
  const isPaperTrading = useSelector(getUIIsPaperTrading)
  const fiatCcy = isPaperTrading ? PAPER_FIAT_CCY : FIAT_CCY

  let data = _mapValues(balances, (value, key) => {
    wallets.forEach(walletKey => {
      const total = _get(value, `${walletKey}.${KEYS.TOTAL}`, 0)
      const totalUSD = convertVolume({
        volume: total,
        fromCcy: key,
        toCcy: fiatCcy,
      })
      _set(value, `${walletKey}.${KEYS.TOTAL_SORT}`, totalUSD)
    })

    return value
  })

  if (hideSmallBalances) {
    data = _pickBy(data, (value) => {
      const exchangeUSD = _get(value, KEYS.EXCHANGE)
      return exchangeUSD >= SMALL_BALANCE_THRESHOLD
    })
  }

  return (
    <Balances
      showTransfer
      balances={data}
      hideSmallBalances={hideSmallBalances}
      setHideSmallBalances={setHideSmallBalances}
      smallBalanceThreshold={`${SMALL_BALANCE_THRESHOLD} ${fiatCcy}`}
      handleDepositClick={(d) => onTransferClick(d, MOVEMENT_TYPES.DEPOSITS)}
      handleWithdrawClick={(d) => onTransferClick(d, MOVEMENT_TYPES.WITHDRAWALS)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default memo(BalancesContainer)
