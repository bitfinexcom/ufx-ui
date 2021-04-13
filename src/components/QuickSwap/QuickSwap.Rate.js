/* eslint-disable no-unused-vars */
import { useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Label } from '../ui'

const QuickSwapRate = (props) => {
  const { getConversionRate } = props
  const { values } = useFormikContext()
  const { fromToken: from = '', toToken: to = '' } = values
  const { t } = useTranslation(['quickswap'])
  const expectedRateText = t('expected_rate')
  const expectedRate = `1 ${from.toUpperCase()} ~ ${getConversionRate({ from, to })} ${to.toUpperCase()}`

  return (
    <div className='rate-label'>
      <Label
        tag='div'
        label={expectedRate}
      />
      <Label
        label={expectedRateText}
        tag='div'
      />
    </div>
  )
}

QuickSwapRate.propTypes = {
  getConversionRate: PropTypes.func.isRequired,
}

export default memo(QuickSwapRate)
