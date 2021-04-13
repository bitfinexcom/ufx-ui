import Big from 'bignumber.js'
import cx from 'classnames'
import { useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { ORDER_TOTAL_MAX_DECIMALS } from '../../var/config'
import PrettyValue from '../format/PrettyValue'
import { Tooltip } from '../ui'

const OrderFormTotalValue = (props) => {
  const { quoteCcy, marketOrder } = props
  const { values, errors, touched } = useFormikContext()
  const { amount, price } = values
  const { t } = useTranslation('orderform')

  const value = new Big(amount).multipliedBy(price)
  const total = value.toString()
  const decimals = value.dp()

  const hasError = (errors.amount && touched.amount) || (errors.price && touched.price)

  // adds 'visibility: hidden' for total row, to fix buy/sell buttons position
  const hidden = marketOrder || !amount || !price

  return (
    <div className={cx('order-total__wrapper', { hidden })}>
      {
          !hasError && (
            <Tooltip content={t('order_total_desc', { quoteCcy })}>
              <span className='order-total'>
                {`${t('total')}: ≈ `}
                <PrettyValue
                  value={total}
                  decimals={Math.min(decimals, ORDER_TOTAL_MAX_DECIMALS)}
                />
                {` ${quoteCcy}`}
              </span>
            </Tooltip>
          )
        }
    </div>
  )
}

OrderFormTotalValue.propTypes = {
  quoteCcy: PropTypes.string,
  marketOrder: PropTypes.bool,
}

OrderFormTotalValue.defaultProps = {
  quoteCcy: '',
  marketOrder: false,
}

export default memo(OrderFormTotalValue)
