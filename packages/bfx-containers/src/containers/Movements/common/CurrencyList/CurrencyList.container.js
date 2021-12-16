import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import { getCurrencyLabel, getCryptoCurrencies, getTetherCurrencies } from '../../../../redux/selectors/currencies.selectors'
import { MOVEMENT_SUBTYPES } from '../../../../utils/movements'
import CurrencyList from './CurrencyList'

const CurrencyListContainer = (props) => {
  const { type } = props
  const getCcyLabel = useSelector(getCurrencyLabel)
  const currencies = useSelector(type === MOVEMENT_SUBTYPES.CRYPTO ? getCryptoCurrencies : getTetherCurrencies)
  const result = {}
  currencies.forEach(ccy => {
    result[ccy] = getCcyLabel(ccy)
  })

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CurrencyList {...props} currencies={result} />
  )
}

export default memo(CurrencyListContainer)
