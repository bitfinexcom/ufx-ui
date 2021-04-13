import _keys from 'lodash/keys'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'

import { formatNumber, getDecimal } from '../../functions/number'
import { KEYS } from './Balances.constants'

export const sortData = (data = [], sortKey = KEYS.NAME, ascending = false) => _orderBy(data, [sortKey], [ascending ? 'asc' : 'desc'])

export const balancesAdapter = (data) => {
  const keys = _keys(data)
  return _map(keys, (key) => ({ name: key, ...data[key] }))
}

export const formatBalance = (balance) => {
  const decimals = getDecimal(balance)
  return formatNumber({
    number: balance,
    decimals,
  })
}
