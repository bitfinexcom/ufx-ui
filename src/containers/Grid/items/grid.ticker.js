import { i18n } from '../../../i18n'
import Ticker from '../../Ticker'

export default {
  id: 'ticker',
  component: Ticker,
  defaults: {
    h: 7,
    minW: 3,
    minH: 7,
    static: false,
  },
  title: () => i18n.t('grid:ticker'),
}
