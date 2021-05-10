/* eslint-disable comma-style */
/* eslint-disable camelcase */
import { removePrefix, getPairParts } from '@ufx-ui/utils'

const orderAdapter = (data = []) => {
  const [
    id,
    group_id,
    client_id,
    symbol, // Pair (tBTCUSD, …)
    mts_create, // Millisecond timestamp of creation
    mts_update, // Millisecond timestamp of update
    amount, // Positive means buy, negative means sell
    original_amount,
    type, // The type of the order
    type_prev, // previous order type
    mts_tif,
    , // placeholder,
    flags, // upcoming params
    status, // order status: ACTIVE, EXECUTED, PARTIALLY FILLED, CANCELED
    , // placeholder,
    , // placeholder,
    price,
    price_average,
    price_trailing,
    price_aux_limit, // Auxiliary Limit price (for STOP LIMIT)
    , // placeholder,
    , // placeholder,
    , // placeholder,
    notify, // 1 if Notify flag is active, 0 if not
    hidden, // 1 if Hidden, 0 if not hidden
    placed_id, // If another order caused this order to be placed (OCO) this will be that other order's ID
    , // placeholder,
    , // placeholder,
    , // placeholder,
    , // placeholder,
    , // placeholder,
    meta,
  ] = data

  const [baseCcy, quoteCcy] = getPairParts(symbol)

  return {
    id,
    group_id,
    client_id,
    baseCcy,
    quoteCcy,
    pair: `${baseCcy}/${quoteCcy}`,
    symbol: removePrefix(symbol),
    mts_create,
    placed: mts_update,
    amount,
    originalAmount: original_amount,
    type,
    type_prev,
    mts_tif,
    flags,
    status,
    price,
    priceAverage: price_average,
    price_trailing,
    price_aux_limit,
    notify,
    hidden,
    placed_id,
    meta,
  }
}

export const orderListAdapter = (rawData = []) => rawData.map((row) => orderAdapter(row))

export const orderMapAdapter = (rawData = []) => {
  const obj = {}
  rawData.forEach((row) => {
    const r = orderAdapter(row)
    obj[r.id] = r
  })

  return obj
}

export default orderAdapter
