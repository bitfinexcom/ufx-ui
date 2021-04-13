import _forEach from 'lodash/forEach'
import _set from 'lodash/set'
import _startsWith from 'lodash/startsWith'
import _toUpper from 'lodash/toUpper'

import types, {
  CURRENCY_LABEL,
  CURRENCY_SYMBOL,
  CURRENCY_UNIT_LABEL,
  CURRENCY_UNIT_TOOLTIP,
  CURRENCY_COLLATERAL_MARGIN,
  CURRENCY_POOL,
  CURRENCY_EXPLORER,
  CURRENCY_TX_METHOD,
} from '../constants/currencies.constants'

const CURRENCY_UNIT = 'CURRENCY_UNIT'
const UNIT_SEPARATOR = '|'

const CCY_FUNDING_INDEX = 3
const PAIR_EXCHANGE_INDEX = 7
const PAIR_MARGIN_INDEX = 8
const PAIR_DERIVATIVE_INDEX = 9
const CCY_FUTURES_INDEX = 10
const CCY_PAPER_INDEX = 11
const CCY_READONLY_INDEX = 12
const CCY_TX_STATUS_INDEX = 13

const CCY_TX_STATUS_PAYLOAD = {
  CCY_INDEX: 0,
  HAS_PAYMENT_ID_DEPOSITS_INDEX: 7,
  HAS_PAYMENT_ID_WITHDRAWALS_INDEX: 8,
}

const getCcyListFromTxStatusPayload = (payload, index) => (
  (payload[CCY_TX_STATUS_INDEX] || [])
    .filter((entry) => entry[index] === 1)
    .map((entry) => entry[CCY_TX_STATUS_PAYLOAD.CCY_INDEX])
)

const EXPECTED_CURRENCY_INFO_FIELDS = [
  CURRENCY_LABEL,
  CURRENCY_SYMBOL,
  CURRENCY_UNIT,
  CURRENCY_COLLATERAL_MARGIN,
  CURRENCY_POOL,
  CURRENCY_EXPLORER,
  CURRENCY_TX_METHOD,
]

const INITIAL_STATE = {
  currenciesInfo: {},
  txMethods: {},
  currencySymbolToCurrencyCodeMap: {},
  currencyLabelToCurrencyCodeMap: {},
}

/**
 * @param {Object} map object to add data to
 * @param {Object} lists format: { a: listA } will set {a:true} on the result object for every entry on listA
 */
const addPropertyIfPresentInList = (map, lists) => {
  const res = { ...map }
  _forEach(Object.entries(lists), ([propertyName, list]) => {
    _forEach(list, (elem) => {
      _set(res, [elem, propertyName], true)
    })
  })
  return res
}

const reduceCurrencyInfo = (infoArray, fieldName, currenciesInfo, currencyLabelToCurrencyCodeMap) => {
  _forEach(infoArray, (value) => {
    const [code, fieldValue] = value
    if (fieldName === CURRENCY_LABEL) {
      // use _set will auto convert path (oo.xx) format to object
      // which parse 'on.live': 'ONL' to on: { 'live': 'ONL' }
      // eslint-disable-next-line no-param-reassign
      currencyLabelToCurrencyCodeMap[fieldValue] = code
    }
    if (fieldName === CURRENCY_UNIT) {
      const [unitLabel, unitTooltip] = fieldValue.split(UNIT_SEPARATOR)
      _set(currenciesInfo, [code, CURRENCY_UNIT_LABEL], unitLabel)
      return _set(currenciesInfo, [code, CURRENCY_UNIT_TOOLTIP], unitTooltip)
    }

    if (fieldName === CURRENCY_TX_METHOD) {
      fieldValue.forEach((fv) => {
        _set(currenciesInfo, [fv, fieldName], code)
      })
      // eslint-disable-next-line consistent-return
      return
    }

    return _set(currenciesInfo, [code, fieldName], fieldValue)
  })
}

const reduceCurrencySymbolToCurrencyCode = (currencySymbolArray) => currencySymbolArray.reduce((current, nextArray) => {
  const [code, currencySymbol] = nextArray
  return {
    ...current,
    [currencySymbol]: code,
    [_toUpper(currencySymbol)]: code,
  }
}, {})

const reducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action

  switch (type) {
    case types.REQUEST_CURRENCIES_INFO_SUCCESS: {
      /*
        Payload example: [
          [["IOT","IOTA"],["USX","USDtFx"],["EUX","EURtFx"]],
          [["IOT","IOTA"]],
          [["IOT","Mi|MegaIOTA"]]
        ]
        The reducer will map it to: {
          IOT: {
            name: 'IOTA',
            symbol: 'IOTA',
            unitLabel: 'Mi',
            unitTooltip: 'MegaIOTA',
          },
          USX: {
            name: 'USDtFx',
          },
          EUX: {
            name: 'EURtFx',
          }
        }
       */
      const stateUpdate = {}
      const currenciesInfo = {}
      const currencyLabelToCurrencyCodeMap = {}
      EXPECTED_CURRENCY_INFO_FIELDS.forEach((fieldName, index) => {
        const array = payload[index]
        if (Array.isArray(array)) {
          reduceCurrencyInfo(array, fieldName, currenciesInfo, currencyLabelToCurrencyCodeMap)
        }
        if (fieldName === CURRENCY_TX_METHOD) {
          if (Array.isArray(array)) {
            const tetherMethods = array.reduce((acc, row) => {
              const [txMethod, ccyList] = row || []
              if (_startsWith(txMethod, 'TETHER')) {
                acc[txMethod] = ccyList
              }
              return acc
            }, {})
            stateUpdate.tetherProtocolToCurrencyMapping = tetherMethods
          }
        }
      })
      stateUpdate.currenciesInfo = currenciesInfo
      stateUpdate.currenciesInfo = addPropertyIfPresentInList(
        currenciesInfo,
        {
          funding: payload[CCY_FUNDING_INDEX],
          futures: payload[CCY_FUTURES_INDEX],
          paper: payload[CCY_PAPER_INDEX],
          readOnly: payload[CCY_READONLY_INDEX],
        },
      )

      stateUpdate.txMethods = addPropertyIfPresentInList(
        {},
        {
          hasPaymentIdForDeposits: getCcyListFromTxStatusPayload(
            payload, CCY_TX_STATUS_PAYLOAD.HAS_PAYMENT_ID_DEPOSITS_INDEX,
          ),
          hasPaymentIdForWithdrawals: getCcyListFromTxStatusPayload(
            payload, CCY_TX_STATUS_PAYLOAD.HAS_PAYMENT_ID_WITHDRAWALS_INDEX,
          ),
        },
      )

      stateUpdate.currencyLabelToCurrencyCodeMap = currencyLabelToCurrencyCodeMap
      stateUpdate.pairsInfo = (
        addPropertyIfPresentInList(
          {},
          {
            exchange: payload[PAIR_EXCHANGE_INDEX],
            margin: payload[PAIR_MARGIN_INDEX],
            derivative: payload[PAIR_DERIVATIVE_INDEX],
          },
        )
      )
      // currency symbol to currency code map
      if (Array.isArray(payload[1])) {
        stateUpdate.currencySymbolToCurrencyCodeMap = reduceCurrencySymbolToCurrencyCode(
          payload[1],
        )
      }

      return {
        ...state,
        ...stateUpdate,
      }
    }

    default: {
      return state
    }
  }
}

export default reducer
