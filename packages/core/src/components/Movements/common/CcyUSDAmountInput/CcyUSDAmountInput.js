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
  /**
   * The currency used in input
   */
  currency: PropTypes.string.isRequired,
  /**
   * The currency symbol rendered
   */
  symbol: PropTypes.string.isRequired,
  /**
   * The value of the input
   */
  value: PropTypes.string.isRequired,
  /**
   * The function called when the input changes.
   */
  onChange: PropTypes.func.isRequired,
  /**
   * The min value of the input
   */
  minAmount: PropTypes.number,
  /**
   * If true, the block with the
   * USD equivalent is dispayed next to
   */
  showUsdEquivalent: PropTypes.bool,
  /**
   * The error message is dispayed below input
   */
  error: PropTypes.string,
  /**
   * The function which calculates
   * the USD equivalent of value
   */
  convertCcy: PropTypes.func.isRequired,
}

export const defaultProps = {
  showUsdEquivalent: false,
  minAmount: null,
  error: null,
}

CcyUSDAmountInput.defaultProps = defaultProps

export default withI18nProvider(memo(CcyUSDAmountInput))
