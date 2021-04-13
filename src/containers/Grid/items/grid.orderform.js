import { withHeightUpdate } from '../../../hoc'
import { i18n } from '../../../i18n'
import OrderForm from '../../OrderForm'

export default {
  id: 'orderform',
  component: withHeightUpdate(OrderForm),
  defaults: {
    h: 12.5,
    w: 4,
    minW: 4,
    minH: 12.5,
    static: false,
  },
  title: () => i18n.t('grid:order_form'),
}
