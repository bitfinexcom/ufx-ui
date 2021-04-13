import _toString from 'lodash/toString'
import PropTypes from 'prop-types'
import React, {
  memo, useState, useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'

import withI18nProvider from '../../../../hoc/withI18nProvider'
import AmountInput from './AmountInput'
import HelpMessage from './HelpMessage'

const FIAT_CCY = 'USD'

export const CcyUSDAmountInput = ({
  currency,
  symbol,
  value,
  onChange,
  minAmount,
  showUsdEquivalent,
  error,
  convertCcy,
}) => {
  const { t } = useTranslation('movements')

  const [usdEquiv, setUsdEquiv] = useState('0')
  const [isEditingUsdEquiv, setIsEditingUsdEquiv] = useState(false)

  const handleCcyAmountChange = (newValue) => {
    onChange(newValue)
    const newUsdEquiv = convertCcy({
      volume: Number(newValue),
      fromCcy: currency,
      toCcy: FIAT_CCY,
    })

    setUsdEquiv((newUsdEquiv).toFixed(2))
  }

  const handleUsdEquivChange = (usdVal) => {
    setUsdEquiv(usdVal)
    const newCcyVal = convertCcy({
      volume: Number(usdVal),
      fromCcy: FIAT_CCY,
      toCcy: currency,
    })

    onChange(_toString(newCcyVal))
  }

  // updates equiv amount when AvailableBalance box is clicked or ticker/conversion changes
  useEffect(() => {
    if (isEditingUsdEquiv) {
      // prevents loop of changing values when editing usdEquiv
      return
    }
    setUsdEquiv((convertCcy({
      volume: Number(value),
      fromCcy: currency,
      toCcy: FIAT_CCY,
    })).toFixed(2))
  }, [convertCcy, currency, isEditingUsdEquiv, value])

  return (
    <div className='ccy-usd'>
      <div className='label'>{t('amount')}</div>

      <AmountInput
        value={value}
        onChange={handleCcyAmountChange}
        symbol={symbol}
      />

      {showUsdEquivalent && (
        <>
          <div className='equiv'>
            ≈
          </div>
          <AmountInput
            value={usdEquiv}
            onChange={handleUsdEquivChange}
            onFocus={() => setIsEditingUsdEquiv(true)}
            onBlur={() => setIsEditingUsdEquiv(false)}
            symbol={FIAT_CCY}
          />
        </>
      )}

      <span className='help'>
        <HelpMessage
          currency={currency}
          symbol={symbol}
          handleCcyAmountChange={handleCcyAmountChange}
          convertCcy={convertCcy}
          showUsdEquivalent={showUsdEquivalent}
          minAmount={minAmount}
          error={error}
        />
      </span>
    </div>
  )
}

CcyUSDAmountInput.propTypes = {
  currency: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  minAmount: PropTypes.number,
  showUsdEquivalent: PropTypes.bool,
  error: PropTypes.string,
  convertCcy: PropTypes.func.isRequired,
}

export const defaultProps = {
  showUsdEquivalent: false,
  minAmount: null,
  error: null,
}

CcyUSDAmountInput.defaultProps = defaultProps

export default withI18nProvider(memo(CcyUSDAmountInput))
