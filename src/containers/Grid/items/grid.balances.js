import { i18n } from '../../../i18n'
import Balances from '../../Balances'

export default {
  id: 'balances',
  component: Balances,
  defaults: {
    h: 12.8,
    w: 4,
    minW: 3,
    minH: 12,
    static: false,
  },
  title: () => i18n.t('grid:balances'),
}
