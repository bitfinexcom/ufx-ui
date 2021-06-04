import { i18n } from '@ufx-ui/core'

import OrderHistory from '../../OrderHistory'

export default {
  id: 'orderHistory',
  component: OrderHistory,
  defaults: {
    h: 13.9,
    minW: 5,
    minH: 6,
    static: false,
  },
  title: () => i18n.t('grid:order_history'),
}
