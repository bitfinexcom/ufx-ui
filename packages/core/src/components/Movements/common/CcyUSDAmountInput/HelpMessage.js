import _size from 'lodash/size'
import PropTypes from 'prop-types'
import React, { useMemo, memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import * as Classes from '../../../../common/classes'
import { Button } from '../../../ui'

const FIAT_CCY = 'USD'

const HelpMessage = (props) => {
  const {
    currency,
    symbol,
    handleCcyAmountChange,
    convertCcy,
    showUsdEquivalent,
    minAmount,
    error,
  } = props
  const { t } = useTranslation('movements')
  const minUsdEquiv = useMemo(() => (
    convertCcy({
      volume: Number(minAmount),
      fromCcy: currency,
      toCcy: FIAT_CCY,
    })
  ), [convertCcy, currency, minAmount])

  return (
    <>
      {
        minAmount > 0 && (
          <>
            <Trans i18nKey='movements:min_amount'>
              <Button
                small
                minimal
                className='min-amount'
                onClick={() => handleCcyAmountChange(minAmount.toString())}
              >
                <>
                  {{ minAmount }}
                  {{ symbol }}
                </>
              </Button>
            </Trans>
            {showUsdEquivalent && (
              t('min_amount_usd_equiv', { value: minUsdEquiv.toFixed(2) })
            )}
          </>
        )
      }
      {
        _size(error) > 0 && (
        <div className={Classes.ERROR_TEXT}>
          {error}
        </div>
        )
      }
    </>
  )
}

HelpMessage.propTypes = {
  currency: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  handleCcyAmountChange: PropTypes.func.isRequired,
  convertCcy: PropTypes.func.isRequired,
  showUsdEquivalent: PropTypes.bool,
  minAmount: PropTypes.number,
  error: PropTypes.string,
}

HelpMessage.defaultProps = {
  showUsdEquivalent: false,
  minAmount: null,
  error: null,
}

export default memo(HelpMessage)
