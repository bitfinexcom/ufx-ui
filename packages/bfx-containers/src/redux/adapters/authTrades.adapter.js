/* eslint-disable camelcase */

const tradesAdapter = (data = []) => {
  const [
    id,
    pair,
    mts_create,
    order_id,
    exec_amount,
    exec_price,
    order_type,
    order_price,
    maker,
    fee,
    fee_currency,
  ] = data

  return {
    id,
    pair,
    mts: mts_create,
    order_id,
    amount: exec_amount,
    price: exec_price,
    order_type,
    order_price,
    maker,
    fee,
    fee_currency,
  }
}

export default tradesAdapter
