import { CcyUSDAmountInput } from '@ufx-ui/core'
import { buildPair } from '@ufx-ui/utils'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import useTickers from '../../../../hooks/useTickers'
import { getConversions } from '../../../../redux/selectors/conversions.selectors'
import { convertVolume } from '../../../../utils/ticker'

const CcyUSDAmountInputContainer = (props) => {
  const { tickers } = useTickers()
  const conversions = useSelector(getConversions)
  const convertCcy = convertVolume(tickers, buildPair, conversions)

  return (
    <CcyUSDAmountInput
      convertCcy={convertCcy}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default memo(CcyUSDAmountInputContainer)
