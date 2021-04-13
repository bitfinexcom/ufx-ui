import { i18n } from '../../../i18n'
import TickerList from '../../TickerList'

export default {
  id: 'tickerlist',
  component: TickerList,
  defaults: {
    h: 15.4,
    minH: 11,
    minW: 4,
    static: false,
  },
  title: () => i18n.t('grid:tickers'),
}
