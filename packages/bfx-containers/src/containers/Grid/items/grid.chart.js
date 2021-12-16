import { i18n } from '@ufx-ui/core'

import Chart from '../../Chart'

export default {
  id: 'chart',
  component: Chart,
  defaults: {
    minH: 20,
    h: 20,
    minW: 4,
    w: 4,
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
