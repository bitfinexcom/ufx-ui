/* eslint-disable import/prefer-default-export */
import _isEmpty from 'lodash/isEmpty'
import _toUpper from 'lodash/toUpper'
import _uniq from 'lodash/uniq'

import { getPairParts } from '../../functions/format'
import { CURRENCY_TABS_PREFERRED_ORDER } from '../../utils/ticker'

const EMPTY_ARR = []

export const getCcyTabs = (tradingTickerKeys, lastInPair, getCurrencySymbol) => {
  const quoteCcys = tradingTickerKeys.map(symbol => lastInPair(symbol, true))
  const tabs = _uniq([...CURRENCY_TABS_PREFERRED_ORDER, ...quoteCcys])

  return tabs.map(
    (ccy) => {
      const id = getCurrencySymbol(ccy)

      return ({
        id,
        title: _toUpper(id),
      })
    },
  )
}

export const prepareTickers = (keys, tickers, getCurrencySymbol) => {
  if (_isEmpty(keys)) {
    return EMPTY_ARR
  }

  return keys.map(symbol => {
    const [baseCcy, quoteCcy] = getPairParts(symbol)

    const ticker = tickers[symbol]
    const lastPrice = ticker.lastPrice || 0
    const volume = ticker.volume || 0

    return ({
      ...ticker,
      id: symbol,
      baseCcy: getCurrencySymbol(baseCcy),
      quoteCcy: getCurrencySymbol(quoteCcy),
      volume: volume * lastPrice,
    })
  })
}
