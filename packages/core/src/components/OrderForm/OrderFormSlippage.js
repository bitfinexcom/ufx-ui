import cx from 'classnames'
import { useFormikContext } from 'formik'
import _values from 'lodash/values'
import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { getSlippagePerc } from './OrderForm.helpers'
import * as Classes from '../../common/classes'
import { Tooltip } from '../ui'

const OrderFormSlippage = (props) => {
  const {
    asks, bestAsk, marketOrder, tooltip,
  } = props
  const { t } = useTranslation('orderform')
  const {
    values, errors, touched,
  } = useFormikContext()
  const { amount } = values
  const asksValues = _values(asks)
  const priceImpact = getSlippagePerc(asksValues, amount, bestAsk)
  const hasError = !amount || (errors.amount && touched.amount)
  const hidden = !marketOrder || !amount

  return (
    <div className={cx('slippage__wrapper', { hidden })}>
      {
        !hasError && (
          <Tooltip
            placement='top'
            className={`${Classes.ORDER_FORM}__tooltip`}
            content={tooltip}
            persistent
          >
            {`${t('price_impact')} <${priceImpact}%`}
          </Tooltip>
        )
      }
    </div>
  )
}

OrderFormSlippage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  asks: PropTypes.object,
  bestAsk: PropTypes.number,
  tooltip: PropTypes.node.isRequired,
}

OrderFormSlippage.defaultProps = {
  asks: {},
  bestAsk: 0,
}

export default OrderFormSlippage
