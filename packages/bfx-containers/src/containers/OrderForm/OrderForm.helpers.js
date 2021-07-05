import { i18n, ORDER_TYPES } from '@ufx-ui/core'
import { setSigFig } from '@ufx-ui/utils'

// source: https://github.com/bitfinexcom/bfx-api-node-models/blob/master/lib/order.js
export const FLAGS = {
  POSTONLY: 4096,
}

export const getFlags = (args = {}) => {
  const {
    postOnly = false,
  } = args

  let result = 0

  // post only: ensures the limit order will be added and not match with a pre-existing order
  if (postOnly) result += FLAGS.POSTONLY

  return result
}

export const validatePrice = (isBuy, price, topAsk, topBid) => {
  const errors = []
  const isSell = !isBuy

  const topAskMax = topAsk * 1.1
  if (!isSell && price > topAskMax) {
    errors.push(i18n.t('orderform:buy_price_out_of_range', { maxPrice: setSigFig(topAskMax), priceDeltaPercent: 10 }))
  }

  const topBidMax = topBid * 0.9
  if (isSell && price < topBidMax) {
    errors.push(i18n.t('orderform:sell_price_out_of_range', { maxPrice: setSigFig(topBidMax), priceDeltaPercent: 10 }))
  }

  return errors
}

export const validate = (data, topAsk, topBid) => {
  const {
    price,
    isBuy,
    orderType: type,
  } = data || {}

  const priceValidation = (type === ORDER_TYPES.EXCHANGE_MARKET)
    ? []
    : validatePrice(isBuy, Number(price), topAsk, topBid)

  return [].concat(priceValidation)
}
