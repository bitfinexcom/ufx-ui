import { i18n } from '@ufx-ui/core'

import TickerList from '../../TickerList'

export default {
  id: 'tickerlist',
  component: TickerList,
  defaults: {
    minH: 11,
    h: 15.4,
    minW: 4,
    w: 4,
    static: false,
  },
  title: () => i18n.t('grid:tickers'),
}
