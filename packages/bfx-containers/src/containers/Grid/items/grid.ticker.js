import { i18n } from '@ufx-ui/core'

import Ticker from '../../Ticker'

export default {
  id: 'ticker',
  component: Ticker,
  defaults: {
    minH: 7,
    h: 7,
    minW: 3,
    w: 3,
    static: false,
  },
  title: () => i18n.t('grid:ticker'),
}
