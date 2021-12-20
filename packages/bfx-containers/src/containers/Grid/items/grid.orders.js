import { i18n } from '@ufx-ui/core'

import Orders from '../../Orders'

export default {
  id: 'orders',
  component: Orders,
  defaults: {
    minH: 6,
    h: 13.9,
    minW: 5,
    w: 5,
    static: false,
  },
  title: () => i18n.t('grid:orders'),
}
