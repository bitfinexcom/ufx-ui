import { i18n } from '@ufx-ui/core'
import React from 'react'

import { DepthChart, DepthChartToolbar } from '../../DepthChart'

export default {
  id: 'depthchart',
  component: DepthChart,
  defaults: {
    h: 10,
    minW: 4,
    minH: 10,
    static: false,
  },
  title: (args) => {
    if (args) {
      const { formattedPair } = args
      return `${i18n.t('grid:depth_chart')} (${formattedPair})`
    }
    return i18n.t('grid:depth_chart')
  },
  toolbar: () => (
    <DepthChartToolbar />
  ),
}
