import { i18n } from '../../../i18n'
import Orders from '../../Orders'

export default {
  id: 'orders',
  component: Orders,
  defaults: {
    h: 13.9,
    minW: 5,
    minH: 6,
    static: false,
  },
  title: () => i18n.t('grid:orders'),
}
