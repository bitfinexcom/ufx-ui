import base64 from 'base-64'
import crypto from 'crypto-js'
import _size from 'lodash/size'
import _startsWith from 'lodash/startsWith'

import { apiKey, apiSecret } from './config.selectors'

// https://docs.bitfinex.com/docs/ws-auth#section-channel-filters
const AUTH_CHANNELS_FILTER = ['trading', 'balance', 'wallet']

let lastNonce = Date.now() * 1000

const getHashedPayload = (payload, secret) => crypto
  .HmacSHA384(payload, secret)
  .toString(crypto.enc.Hex)

/**
 * prepares a websocket request to subscribe to account info channel
 * uses the api key and api secret to sign the request
 *
 * @return {Object}
 */
export const signWithApiKey = () => {
  lastNonce += 1
  const authNonce = lastNonce
  const authPayload = `AUTH${authNonce}${authNonce}`
  const authSig = getHashedPayload(authPayload, apiSecret)

  return {
    apiKey,
    authSig,
    authNonce,
    authPayload,
    filter: AUTH_CHANNELS_FILTER,
  }
}

export const getAuthHeaders = (opts = {}) => {
  const {
    url,
    data = {},
  } = opts

  lastNonce += 1
  const nonce = lastNonce.toString()
  const headers = {}

  if (_startsWith(url, '/v1/')) {
    // v1 API keys signature
    data.request = url
    data.nonce = nonce
    const payload = base64
      .encode(JSON.stringify(data))
      .toString('base64')
    const signature = crypto
      .HmacSHA384(payload, apiSecret)
      .toString(crypto.enc.Hex)

    headers['X-BFX-SIGNATURE'] = signature
    headers['X-BFX-PAYLOAD'] = payload
    headers['X-BFX-APIKEY'] = apiKey
  }

  if (_startsWith(url, '/v2/')) {
    // v2 API keys signature
    let signature = _size(data) ? JSON.stringify(data) : ''
    signature = `/api${url}${nonce}${signature}`
    signature = getHashedPayload(signature, apiSecret)

    headers['bfx-nonce'] = nonce
    headers['bfx-apikey'] = apiKey
    headers['bfx-signature'] = signature
  }

  return headers
}
