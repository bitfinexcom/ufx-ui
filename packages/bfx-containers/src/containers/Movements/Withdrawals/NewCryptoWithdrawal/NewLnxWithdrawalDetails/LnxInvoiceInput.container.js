import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import {
  getUIWithdrawalsMaxLnx,
  getUIWithdrawalsMinLnx,
} from '../../../../../redux/selectors/UI.selectors'
import LnxInvoiceInput from './LnxInvoiceInput'

const LnxInvoiceInputDetails = (props) => {
  const minLnx = Number(useSelector(getUIWithdrawalsMinLnx))
  const maxLnx = Number(useSelector(getUIWithdrawalsMaxLnx))

  return (
    <LnxInvoiceInput
      minLnx={minLnx}
      maxLnx={maxLnx}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default memo(LnxInvoiceInputDetails)
