import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import useTickers from '../../hooks/useTickers'
import { getCurrencySymbolMemo } from '../../redux/selectors/currencies.selectors'
import MarketListWrapper from './MarketList.wrapper'

const MarketListContainer = (props) => {
  const getCurrencySymbol = useSelector(getCurrencySymbolMemo)
  const { tickers, tradingTickerKeys } = useTickers()

  return (
    <MarketListWrapper
      tickers={tickers}
      tradingTickerKeys={tradingTickerKeys}
      getCurrencySymbol={getCurrencySymbol}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default memo(MarketListContainer)
