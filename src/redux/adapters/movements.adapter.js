/* eslint-disable comma-style */
/* eslint-disable camelcase */

const adapter = (data = []) => {
  const [
    id,
    currency,
    , // placeholder,
    , // placeholder,
    , // placeholder,
    mts_start,
    mts_update,
    , // placeholder,
    , // placeholder,
    status,
    , // placeholder,
    , // placeholder,
    amount,
    fees,
    , // placeholder,
    , // placeholder,
    destination_address,
    , // placeholder,
    , // placeholder,
    , // placeholder,
    transaction_id,
  ] = data

  return {
    id,
    currency,
    mts_start,
    mts_update,
    status,
    amount,
    fees,
    destination_address,
    txId: transaction_id,
  }
}

export default {
  adapter,
}
