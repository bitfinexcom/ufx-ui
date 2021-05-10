/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
// https://github.com/lightningnetwork/lightning-rfc/blob/master/11-payment-encoding.md
const multiers = {
  m: 0.001, // milli
  u: 0.000001, // micro
  n: 0.000000001, // nano
  p: 0.000000000001, // pico
  '': 1,
}

export const decodePaymentRequest = (paymentRequest) => {
  const index = paymentRequest.lastIndexOf('1')
  if (index < 2) {
    console.error('bech32 error: No seporator or missing prefix')
    return { error: 'withdrawals:invalid_payment_request' }
  }
  const prefix = paymentRequest.slice(0, index)

  if (prefix.slice(0, 2).toLowerCase() !== 'ln') {
    console.error('bolt11 error: Payment Request should start with "ln"')
    return { error: 'withdrawals:invalid_payment_request' }
  }

  const prefixMatches = prefix.match(/^ln([^0-9]+)([0-9]+)([a-z]?)/)
  if (!prefixMatches) {
    console.error('bolt11 error: Unable to parse prefix')
    return { error: ('withdrawals:invalid_payment_request') }
  }
  const [, network, amountString, multiplierCode] = prefixMatches
  const amount = parseInt(amountString, 10)
  const multiplier = multiers[multiplierCode]

  if (!multiplier) {
    console.error('bolt11 error: Unknown multiplier', multiplierCode)
    return { error: ('withdrawals:invalid_payment_request') }
  }

  return {
    amount: amount * multiplier,
    network,
  }
}
