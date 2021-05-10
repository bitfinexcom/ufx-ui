import { isFiat } from '@ufx-ui/utils'
import _keys from 'lodash/keys'

export const CURRENCY_TABS_PREFERRED_ORDER = ['USD', 'EUR', 'GBP', 'JPY', 'BTC', 'ETH']

export const getTickerPrice = (tickers, getTickerSymbol, conversions) => (from, to) => {
  if (from === to) {
    return 1
  }

  const getTicker = (_from, _to) => tickers[getTickerSymbol(_from, _to)]

  const pair = getTicker(from, to)
  if (pair) {
    return pair.lastPrice
  }

  const reversePair = getTicker(to, from)
  if (reversePair) {
    return 1 / reversePair.lastPrice
  }

  let lastPrice

  const conversion = isFiat(to) ? conversions[from] : conversions[to]
  if (conversion) {
    _keys(conversion).some((key) => {
      const mappedFrom = conversions[from] && !isFiat(from) ? key : from
      const mappedTo = conversions[to] && !isFiat(to) ? key : to
      const conversionRate = conversion[key]

      const mappedPair = getTicker(mappedFrom, mappedTo)
      if (mappedPair) {
        lastPrice = mappedPair.lastPrice * conversionRate
        return true
      }

      const mappedRPair = getTicker(mappedTo, mappedFrom)
      if (mappedRPair) {
        lastPrice = 1 / (mappedRPair.lastPrice * conversionRate)
        return true
      }

      return false
    })
  }

  return lastPrice
}

export const convertVolume = (tickers, getTickerSymbol, conversions = {}) => ({
  volume,
  fromCcy,
  toCcy,
  midCcy,
  tickerPrice = 0,
}) => {
  if (fromCcy === toCcy) {
    return volume
  }

  const getPrice = getTickerPrice(tickers, getTickerSymbol, conversions)

  const matchingTickerPrice = getPrice(fromCcy, toCcy)
  const unitTickerPrice = getPrice(midCcy, toCcy)
  let scale
  let price = tickerPrice

  if (matchingTickerPrice) {
    scale = 1
    price = matchingTickerPrice
  } else if (unitTickerPrice) {
    scale = unitTickerPrice
  } else {
    const USDSym = 'USD'
    const USTSym = 'UST'

    /* ex. fromCcy: XRP, toCcy: ETH, midCcy: BTC
      midCcyUSDPrice: midCcy price in terms of USD, i.e. BTCUSD pair
      USDToCcyPrice: USD price in terms of toCcy, i.e. USDETH pair
      XRPETH_price = XRPBTC_price * BTCUSD_price * USDETH_price
                   = price * scale , where price = XRPBTC_price and scale = BTCUSD_price * USDETH_price
    */

    // conversion using USD
    const midCcyUSDPrice = getPrice(midCcy, USDSym)
    const USDToccyPrice = getPrice(USDSym, toCcy)

    // conversion using UST
    const midCcyUSTPrice = getPrice(midCcy, USTSym)
    const USTToccyPrice = getPrice(USTSym, toCcy)
    if (USDToccyPrice && midCcyUSDPrice) {
      scale = USDToccyPrice * midCcyUSDPrice
    } else if (USTToccyPrice && midCcyUSTPrice) {
      scale = USTToccyPrice * midCcyUSTPrice
    } else {
      scale = 0
    }
  }

  return volume * price * scale
}
