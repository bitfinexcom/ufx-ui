import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { notifyError } from '../../../../../redux/actions/notifications.actions'
import { getUiInvoices } from '../../../../../redux/selectors/movements.selectors'
import {
  getUIWithdrawalsMaxLnx,
  getUIWithdrawalsMinLnx,
} from '../../../../../redux/selectors/UI.selectors'
import NewInvoice from './NewInvoice'

const NewInvoiceContainer = (props) => {
  const minLnx = Number(useSelector(getUIWithdrawalsMinLnx))
  const maxLnx = Number(useSelector(getUIWithdrawalsMaxLnx))
  const invoices = useSelector(getUiInvoices)
  const dispatch = useDispatch()

  return (
    <NewInvoice
      minLnx={minLnx}
      maxLnx={maxLnx}
      invoices={invoices}
      notifyError={notifyError}
      dispatch={dispatch}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

export default memo(NewInvoiceContainer)
