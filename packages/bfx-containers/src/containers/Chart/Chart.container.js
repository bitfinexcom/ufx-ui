import { Chart } from '@ufx-ui/core'
import React from 'react'

import useCommonBfxData from '../../hooks/useCommonBfxData'

const ChartContainer = ({
  baseCcy,
  quoteCcy,
}) => {
  const { symbol } = useCommonBfxData(baseCcy, quoteCcy)

  return (
    <Chart
      market={{
        wsID: symbol,
        base: baseCcy,
        quote: quoteCcy,
      }}
    />
  )
}

export default ChartContainer
