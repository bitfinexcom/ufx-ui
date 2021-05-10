import _pickBy from 'lodash/pickBy'
import _toUpper from 'lodash/toUpper'
import memoizeOne from 'memoize-one'

export const ALL_TETHER_PROTOCOLS = {
  tetheruso: {
    method: 'tetheruso',
    description: 'Tether(USD) on Omni',
    transport_ccy: 'BTC',
    ccy: 'USO',
    cc_tx: true,
  },
  tetheruse: {
    method: 'tetheruse',
    description: 'Tether(USD) on Ethereum',
    transport_ccy: 'ETH',
    ccy: 'USE',
    cc_tx: true,
  },
  tetheruss: {
    method: 'tetheruss',
    description: 'Tether(USD) on EOS',
    transport_ccy: 'EOS',
    ccy: 'USS',
    cc_tx: true,
  },
  tetherusx: {
    method: 'tetherusx',
    description: 'Tether(USD) on Tron',
    transport_ccy: 'TRX',
    ccy: 'USX',
    cc_tx: true,
  },
  tetherusl: {
    method: 'tetherusl',
    description: 'Tether(USD) on Liquid',
    transport_ccy: 'LBT',
    ccy: 'USL',
    cc_tx: true,
  },
  tetherusdtalg: {
    method: 'tetherusdtalg',
    description: 'Tether(USD) on Algorand',
    transport_ccy: 'USDTALG',
    ccy: 'USDTALG',
    cc_tx: true,
  },
  tetherusdtbch: {
    method: 'tetherusdtbch',
    description: 'Tether(USD) on BCH',
    transport_ccy: 'USDTBCH',
    ccy: 'USDTBCH',
    cc_tx: true,
  },
  tetherusdtomg: {
    method: 'tetherusdtomg',
    description: 'Tether(USD) on OMG',
    transport_ccy: 'USDTOMG',
    ccy: 'USDTOMG',
    cc_tx: true,
  },
  tethereue: {
    method: 'tethereue',
    description: 'Tether(EURO) on Ethereum',
    ccy: 'EUE',
    transport_ccy: 'ETH',
    cc_tx: true,
  },
  tethercnhte: {
    method: 'tethercnhte',
    description: 'Tether(CNH) on Ethereum',
    ccy: 'CNHTE',
    transport_ccy: 'ETH',
    cc_tx: true,
  },
  tetherxaute: {
    method: 'tetherxaute',
    description: 'Tether(XAU) on Ethereum',
    ccy: 'XAUTE',
    transport_ccy: 'ETH',
    cc_tx: true,
  },
}

export const getTetherProtocols = memoizeOne((tetherProtocolCcyMapping, currency) => {
  const filteredMethods = _pickBy(tetherProtocolCcyMapping, (ccyList) => ccyList.includes(currency))
  return _pickBy(ALL_TETHER_PROTOCOLS, ({ method }) => filteredMethods[_toUpper(method)])
})
