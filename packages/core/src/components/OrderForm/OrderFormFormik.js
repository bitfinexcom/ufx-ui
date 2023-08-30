import cx from 'classnames'
import { Form, Field, useFormikContext } from 'formik'
import _isNumber from 'lodash/isNumber'
import PropTypes from 'prop-types'
import React, { memo, useEffect, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

import { DEFAULT_ACTION_TIMEOUT } from './OrderForm.constants'
import OrderFormBidAsk from './OrderFormBidAsk'
import OrderFormTotalValue from './OrderFormTotalValue'
import * as Classes from '../../common/classes'
import Intent from '../../common/intent'
import { TEXT_ALIGNMENT } from '../../common/props'
import { ORDER_TYPES } from '../format/OrderType'
import {
  Input,
  Checkbox,
  Dropdown,
  DateTimePicker,
} from '../FormikFields'
import {
  CooldownButton,
  Tooltip,
  Label,
} from '../ui'

const OrderFormFormik = forwardRef((props, ref) => {
  const {
    topBid,
    topAsk,
    baseCcy,
    quoteCcy,
    lastPriceReq,
    className,
    disabled,
    orderTypes,
    minDays,
    maxDays,
    tifTooltip,
  } = props

  const {
    values,
    setFieldValue,
    submitForm,
    setFieldTouched,
  } = useFormikContext()

  const { orderType, tif } = values
  const { t } = useTranslation('orderform')

  const limitOrder = orderType === ORDER_TYPES.EXCHANGE_LIMIT
  const marketOrder = orderType === ORDER_TYPES.EXCHANGE_MARKET

  useEffect(() => {
    if (_isNumber(lastPriceReq) && !marketOrder) {
      setFieldValue('price', lastPriceReq)
    }
  }, [setFieldValue, lastPriceReq, marketOrder])

  useEffect(() => {
    if (marketOrder) {
      setFieldValue('price', t('best_market_price'))
    } else {
      setFieldValue('price', '')
    }
  }, [setFieldValue, marketOrder, t])

  // If current pair is switched or order type changed, reset form input
  useEffect(() => {
    setFieldValue('price', '')
    setFieldTouched('price', false)
    setFieldValue('tif', false)
    setFieldValue('tifDate', null)
    setFieldValue('amount', '')
    setFieldValue('postOnly', false)
    setFieldTouched('amount', false)
  }, [setFieldValue, setFieldTouched, baseCcy, quoteCcy, orderType])

  useEffect(() => {
    // reset tifDate if tif checkbox is unchecked
    if (!tif) {
      setFieldValue('tifDate', null)
    }
  }, [tif, setFieldValue])

  const handleSubmit = (isBuy) => {
    setFieldValue('isBuy', isBuy)
    submitForm()
  }

  const classes = cx(Classes.ORDER_FORM, className)

  const isTifInputDisabled = !limitOrder
    ? true
    : !tif

  return (
    <Form className={classes} ref={ref}>
      <Field
        component={Dropdown}
        small
        name='orderType'
        options={orderTypes}
      />

      <div>
        <Field
          component={Checkbox}
          small
          disabled={!limitOrder}
          label={(
            <Tooltip
              placement='top'
              className={`${Classes.ORDER_FORM}__tooltip`}
              content={t('postonly_desc')}
            >{t('postonly')}
            </Tooltip>
        )}
          name='postOnly'
          className='postonly'
        />

        <Field
          component={Checkbox}
          small
          disabled={!limitOrder}
          label={(
            <Tooltip
              placement='top'
              className={`${Classes.ORDER_FORM}__tooltip`}
              content={tifTooltip || t('tif_desc')}
              persistent
            >
              {t('tif')}
            </Tooltip>
        )}
          name='tif'
          className='tif'
        />
      </div>

      <div>
        <div className='label-wrapper'>
          <Label small label={`${t('price')} ${quoteCcy}`} />
          <OrderFormBidAsk limitOrder={!marketOrder} topAsk={topAsk} topBid={topBid} />
        </div>
        <Field
          component={Input}
          type='number'
          small
          alignText={marketOrder ? TEXT_ALIGNMENT.CENTER : TEXT_ALIGNMENT.LEFT}
          disabled={marketOrder}
          name='price'
          fieldLabel={t('price')}
          className='price-input'
        />
      </div>

      <div>
        <Label small tag='div' label={`${t('amount')} ${baseCcy}`} />
        <Field
          component={Input}
          type='number'
          small
          alignText={TEXT_ALIGNMENT.LEFT}
          name='amount'
          fieldLabel={t('amount')}
          className='amount-input'
        />
      </div>

      <div>
        <Label small tag='div' label={t('tif_date')} />
        <Field
          component={DateTimePicker}
          type='date'
          small
          alignText={TEXT_ALIGNMENT.LEFT}
          name='tifDate'
          fieldLabel={t('tif_date')}
          className='tif-input'
          disabled={isTifInputDisabled}
          minDays={minDays}
          maxDays={maxDays}
        />
      </div>

      <OrderFormTotalValue quoteCcy={quoteCcy} marketOrder={marketOrder} />

      <CooldownButton
        small
        intent={Intent.PRIMARY}
        disabled={disabled}
        onClick={() => handleSubmit(true)}
        timeoutMs={DEFAULT_ACTION_TIMEOUT}
        className='buy-button'
      >
        {t('buy_ccy', { ccy: baseCcy })}
      </CooldownButton>

      <CooldownButton
        small
        intent={Intent.ERROR}
        disabled={disabled}
        onClick={() => handleSubmit(false)}
        timeoutMs={DEFAULT_ACTION_TIMEOUT}
        className='sell-button'
      >
        {t('sell_ccy', { ccy: baseCcy })}
      </CooldownButton>
    </Form>
  )
})

OrderFormFormik.propTypes = {
  topAsk: PropTypes.number,
  topBid: PropTypes.number,
  baseCcy: PropTypes.string,
  quoteCcy: PropTypes.string,
  disabled: PropTypes.bool,
  lastPriceReq: PropTypes.number,
  className: PropTypes.string,
  orderTypes: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  minDays: PropTypes.number,
  maxDays: PropTypes.number,
  tifTooltip: PropTypes.node,
}

OrderFormFormik.defaultProps = {
  topAsk: 0,
  topBid: 0,
  baseCcy: '',
  quoteCcy: '',
  lastPriceReq: 0,
  className: null,
  disabled: false,
  orderTypes: null,
  minDays: null,
  maxDays: null,
  tifTooltip: null,
}

OrderFormFormik.displayName = 'OrderFormFormik'

export default memo(OrderFormFormik)
