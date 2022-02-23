import { i18n } from '@ufx-ui/core'
import React from 'react'

import { TradesContainer as Trades, TradesToggleContainer } from '../../Trades'

export default {
  id: 'trades',
  component: Trades,
  defaults: {
    minH: 14,
    h: 15.8,
    minW: 4,
    w: 4,
    static: false,
  },
  title: (args) => {
    if (args) {
      const { formattedPair } = args
      return `${i18n.t('grid:trades')} (${formattedPair})`
    }
    return i18n.t('grid:trades')
  },
  toolbar: () => <TradesToggleContainer />,
}
