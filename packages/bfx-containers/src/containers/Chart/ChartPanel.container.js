import { Chart } from '@ufx-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { getCandles } from '../../redux/selectors/candles.selectors'

const ChartContainer = ({
  baseCcy,
  quoteCcy,
  // parentWidth,
  // parentHeight,
  // paddingX,
  // paddingY,
  ...props
}) => {
  console.log('TCL: baseCcy', baseCcy)
  console.log('TCL: quoteCcy', quoteCcy)
  const [state, setState] = useState()

  return (
    <Chart
      market={{
        wsID: '',
        base: baseCcy,
        quote: quoteCcy,
      }}
    />
  )
}

export default ChartContainer
