import { i18n } from '@ufx-ui/core'
import React from 'react'

import Chart from '../../Chart'

export default {
  id: 'chart',
  component: Chart,
  defaults: {
    h: 10,
    minW: 4,
    minH: 10,
    static: false,
  },
  title: (args) => {
    if (args) {
      const { formattedPair } = args
      return `${i18n.t('grid:chart')} (${formattedPair})`
    }
    return i18n.t('grid:chart')
  },
}
