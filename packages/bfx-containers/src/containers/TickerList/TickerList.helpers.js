/* eslint-disable import/prefer-default-export */
import { buildPair, getPairParts } from '@ufx-ui/utils'
import _isEmpty from 'lodash/isEmpty'

import { convertVolume as convertVolumeFunc } from '../../utils/ticker'
import { VOLUME_UNIT, VOLUME_UNIT_PAPER } from './TickerList.constants'

const EMPTY_ARR = []

export const prepareTickers = (keys, tickers, tickerVolUnit = 'USD', getCurrencySymbol, getTickerSymbol = buildPair) => {
  if (_isEmpty(keys) || _isEmpty(tickers)) {
    return EMPTY_ARR
  }

  const convertVolume = convertVolumeFunc(tickers, getTickerSymbol)
  return keys
    .map(symbol => {
      const [baseCcy, quoteCcy] = getPairParts(symbol)
      const ticker = tickers[symbol]
      const tickerVolume = ticker.volume || 0
      const tickerPrice = ticker.lastPrice || 0

      const volumeConverted = convertVolume({
        volume: tickerVolume,
        fromCcy: baseCcy,
        toCcy: tickerVolUnit === VOLUME_UNIT.SELF ? baseCcy : tickerVolUnit,
        midCcy: quoteCcy,
        tickerPrice,
      })

      return ({
        ...ticker,
        id: symbol,
        baseCcy: getCurrencySymbol(baseCcy),
        quoteCcy: getCurrencySymbol(quoteCcy),
        volumeConverted,
      })
    })
}

export const getVolumeUnitList = (isPaperTrading) => (
  isPaperTrading ? VOLUME_UNIT_PAPER : VOLUME_UNIT
)

export const getDefaultVolumeUnit = (isPaperTrading) => (
  isPaperTrading ? VOLUME_UNIT_PAPER.TESTUSD : VOLUME_UNIT.USD
)
