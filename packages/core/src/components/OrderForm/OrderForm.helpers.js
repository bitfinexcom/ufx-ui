import {
  requiredPositiveNumber,
  validateLength,
  validateDecimals,
  validateExpiryDate,
  requiredDate,
} from '@ufx-ui/utils'
import _forEach from 'lodash/forEach'
import * as Yup from 'yup'

import { ORDER_TYPES } from '../format/OrderType'

export const supportedTypes = (t) => ({
  [ORDER_TYPES.EXCHANGE_LIMIT]: t('orderform:limit_order'),
  [ORDER_TYPES.EXCHANGE_MARKET]: t('orderform:market_order'),
})

export const formSchema = (schemaProps) => {
  const {
    minDays,
    maxDays,
    amountMaxDecimals,
    priceMaxDecimals,
    t,
  } = schemaProps
  return (
    Yup.object({
      amount: validateLength(t, t('amount')).concat(
        validateDecimals(amountMaxDecimals, t, t('amount')),
      ).concat(
        requiredPositiveNumber(t, t('amount')),
      ),
      price: Yup.mixed()
        .when('orderType', {
          is: (orderType) => orderType !== ORDER_TYPES.EXCHANGE_MARKET,
          then: validateLength(t, t('price')).concat(
            validateDecimals(priceMaxDecimals, t, t('price')),
          ).concat(
            requiredPositiveNumber(t, t('price')),
          ),
        }),
      postOnly: Yup.bool(),
      tifDate: Yup.mixed()
        .when('tif', {
          is: true,
          then: requiredDate(t, t('date')).concat(
            validateExpiryDate(t, minDays, maxDays),
          ),
        })
      ,
    })
  )
}

export const getSlippagePerc = (asks, userOrderAmount, bestAsk) => {
  let partial = userOrderAmount
  let filledAmount = 0
  let totalCost = 0

  _forEach(asks, (ask) => {
    if (partial > 0) {
      totalCost += Math.abs(ask.amount) * ask.price
      partial -= Math.abs(ask.amount)
      filledAmount += Math.abs(ask.amount)
    }
  })
  const avgBuyPrice = totalCost / filledAmount
  return (((avgBuyPrice - bestAsk) / bestAsk) * 100).toFixed(2)
}
