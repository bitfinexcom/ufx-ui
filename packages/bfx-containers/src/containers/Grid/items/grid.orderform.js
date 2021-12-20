import { i18n, withHeightUpdate } from '@ufx-ui/core'

import OrderForm from '../../OrderForm'

export default {
  id: 'orderform',
  component: withHeightUpdate(OrderForm),
  defaults: {
    minH: 12.5,
    h: 12.5,
    minW: 4,
    w: 4,
    static: false,
  },
  title: () => i18n.t('grid:order_form'),
}
