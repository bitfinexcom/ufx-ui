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
    slippageTooltip,
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
        slippageTooltip={slippageTooltip}
      />
    </Formik>
  )
})

OrderForm.propTypes = {
  topAsk: PropTypes.number,
  topBid: PropTypes.number,
  baseCcy: PropTypes.string,
  quoteCcy: PropTypes.string,
  submitOrder: PropTypes.func,
  lastPriceReq: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  orderTypes: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  amountMaxDecimals: PropTypes.number,
  priceMaxDecimals: PropTypes.number,
  minDays: PropTypes.number,
  maxDays: PropTypes.number,
  tifTooltip: PropTypes.node,
  slippageTooltip: PropTypes.node,
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
  slippageTooltip: null,
  tifTooltip: null,
}

OrderForm.defaultProps = defaultProps

OrderForm.displayName = 'OrderForm'

export default withI18nProvider(memo(OrderForm))
