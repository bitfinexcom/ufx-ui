import { PLATFORM_SETTINGS } from '@ufx-ui/utils'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React, { memo, useMemo, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import withI18nProvider from '../../hoc/withI18nProvider'
import { INITIAL_STATE } from './OrderForm.constants'
import { formSchema, supportedTypes } from './OrderForm.helpers'
import FormikForm from './OrderFormFormik'

const { AMOUNT_DECIMALS } = PLATFORM_SETTINGS

export const OrderForm = forwardRef((props, ref) => {
  const {
    asks,
    topAsk,
    topBid,
    baseCcy,
    quoteCcy,
    submitOrder,
    lastPriceReq,
    className,
    disabled,
    orderTypes,
    amountMaxDecimals,
    priceMaxDecimals,
    minDays,
    maxDays,
    tifTooltip,
  } = props
  const { t } = useTranslation('orderform')

  const defaultOrderTypes = useMemo(() => supportedTypes(t), [t])

  const schemaProps = {
    minDays,
    maxDays,
    amountMaxDecimals,
    priceMaxDecimals,
    t,
  }

  return (
    <Formik
      initialValues={INITIAL_STATE}
      validationSchema={formSchema(schemaProps)}
      onSubmit={(values) => submitOrder(values)}
    >
      <FormikForm
        ref={ref}
        baseCcy={baseCcy}
        quoteCcy={quoteCcy}
        topAsk={topAsk}
        topBid={topBid}
        disabled={disabled}
        lastPriceReq={lastPriceReq}
        className={className}
        orderTypes={orderTypes || defaultOrderTypes}
        minDays={minDays}
        maxDays={maxDays}
        asks={asks}
        tifTooltip={tifTooltip}
      />
    </Formik>
  )
})

OrderForm.propTypes = {
  /**
   * The lowest price for sellingч
   */
  topAsk: PropTypes.number,
  /**
   * The highest price for buying
   */
  topBid: PropTypes.number,
  /**
   * The base currency
   */
  baseCcy: PropTypes.string,
  /**
   * The quote currency
   */
  quoteCcy: PropTypes.string,
  /**
   * The function, called when user submits form
   */
  submitOrder: PropTypes.func,
  /**
   * The last requested price
   */
  lastPriceReq: PropTypes.number,
  /**
   * The classname of OrderForm
   */
  className: PropTypes.string,
  /**
   * If true, form is disabled
   */
  disabled: PropTypes.bool,
  /**
   * The object with existed order types
   */
  orderTypes: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /**
   * The maximum number of decimal places for the amount
   */
  amountMaxDecimals: PropTypes.number,
  /**
   * The maximum number of decimal places for the price
   */
  priceMaxDecimals: PropTypes.number,
  /**
   * The minimum number of days to cancel an order automatically
   */
  minDays: PropTypes.number,
  /**
   * The maximum number of days to cancel an order automatically
   */
  maxDays: PropTypes.number,
  /**
   * The custom element for TIF checkbox tooltip
   */
  tifTooltip: PropTypes.node,
}

export const defaultProps = {
  topAsk: 0,
  topBid: 0,
  baseCcy: '',
  quoteCcy: '',
  submitOrder: () => {},
  lastPriceReq: 0,
  className: null,
  disabled: false,
  orderTypes: null,
  amountMaxDecimals: AMOUNT_DECIMALS,
  priceMaxDecimals: null,
  minDays: null,
  maxDays: null,
  tifTooltip: null,
}

OrderForm.defaultProps = defaultProps

OrderForm.displayName = 'OrderForm'

export default withI18nProvider(memo(OrderForm))
