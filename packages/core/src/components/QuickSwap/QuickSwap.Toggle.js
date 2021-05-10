import { useFormikContext } from 'formik'
import React from 'react'

import { ReactComponent as SwapIcon } from '../../images/swap.svg'
import { Button } from '../ui'

const QuickSwapToggle = () => {
  const { values, setFieldValue, validateForm } = useFormikContext()
  const {
    fromAmount, toAmount, fromToken: from = '', toToken: to = '',
  } = values

  const toggle = () => {
    const newValues = values
    newValues.fromAmount = toAmount
    newValues.toAmount = fromAmount
    newValues.fromToken = to
    newValues.toToken = from
    setFieldValue('fromAmount', newValues.fromAmount)
    setFieldValue('toAmount', newValues.toAmount)
    setFieldValue('fromToken', newValues.fromToken)
    setFieldValue('toToken', newValues.toToken)
    validateForm(newValues)
  }

  return (
    <Button
      onClick={toggle}
      onKeyPress={toggle}
      className='swap-icon'
    >
      <SwapIcon />
    </Button>
  )
}

export default QuickSwapToggle
