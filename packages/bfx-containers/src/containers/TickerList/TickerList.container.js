/* eslint-disable react/jsx-props-no-spreading */
import { buildPair } from '@ufx-ui/utils'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import useTickers from '../../hooks/useTickers'
import { getCurrencySymbolMemo } from '../../redux/selectors/currencies.selectors'
import { getUIIsPaperTrading } from '../../redux/selectors/UI.selectors'
import TickerListWrapper from './TickerList.wrapper'

const TickerListContainer = (props) => {
  const { tickers, tradingTickerKeys } = useTickers()
  const getCurrencySymbol = useSelector(getCurrencySymbolMemo)
  const isPaperTrading = useSelector(getUIIsPaperTrading)

  return (
    <TickerListWrapper
      getTickerSymbol={buildPair}
      tradingTickerKeys={tradingTickerKeys}
      getCurrencySymbol={getCurrencySymbol}
      isPaperTrading={isPaperTrading}
      tickers={tickers}
      {...props}
    />
  )
}

export default memo(TickerListContainer)
