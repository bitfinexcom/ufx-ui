import { useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../ui'

const OrderFormBidAsk = (props) => {
  const { topAsk, topBid, limitOrder } = props
  const { setFieldValue } = useFormikContext()
  const { t } = useTranslation('orderform')

  const disabled = !limitOrder || (!topAsk && !topBid)

  return (
    <div className='ask-bid-wrapper'>
      <Button
        className='ask-bid bid'
        minimal
        onClick={() => setFieldValue('price', topBid)}
        disabled={disabled}
        title={t('set_price_bid')}
      >
        {' '}
      </Button>
      <Button
        className='ask-bid'
        minimal
        onClick={() => setFieldValue('price', topAsk)}
        disabled={disabled}
        title={t('set_price_ask')}
      >{' '}
      </Button>
    </div>
  )
}

OrderFormBidAsk.propTypes = {
  topAsk: PropTypes.number,
  topBid: PropTypes.number,
  limitOrder: PropTypes.bool,
}

OrderFormBidAsk.defaultProps = {
  topAsk: 0,
  topBid: 0,
  limitOrder: true,
}

export default memo(OrderFormBidAsk)
