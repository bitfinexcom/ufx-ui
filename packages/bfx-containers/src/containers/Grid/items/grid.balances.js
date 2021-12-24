import { i18n } from '@ufx-ui/core'

import Balances from '../../Balances'

export default {
  id: 'balances',
  component: Balances,
  defaults: {
    minH: 12,
    h: 12.8,
    minW: 3,
    w: 4,
    static: false,
  },
  title: () => i18n.t('grid:balances'),
}
