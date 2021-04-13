import cx from 'classnames'
import _lowerCase from 'lodash/lowerCase'
import PropTypes from 'prop-types'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import * as Classes from '../../common/classes'
import { BalancesContainer } from '../../containers'
import { isTether, isFiat } from '../../functions/symbols'
import { notifyError } from '../../redux/actions/notifications.actions'
import { getCurrencySymbolMemo } from '../../redux/selectors/currencies.selectors'
import { MOVEMENT_SUBTYPES } from '../../utils/movements'

export const onMovementClick = ({
  dispatch, history, t, getCurrencySymbol,
}) => ({ currency } = {}, movementPath) => {
  const symbol = getCurrencySymbol(currency)

  if (isFiat(symbol)) {
    dispatch(notifyError(t('movements:fiat_not_supported')))
  } else {
    const type = isTether(symbol) ? MOVEMENT_SUBTYPES.TETHER : MOVEMENT_SUBTYPES.CRYPTO
    history.push(`/${movementPath}/${type}/${_lowerCase(currency)}`)
  }
}

const Balances = (props) => {
  const { history } = props
  const { t } = useTranslation('movements')
  const dispatch = useDispatch()

  const getCurrencySymbol = useSelector(getCurrencySymbolMemo)
  const handleMovementClick = useMemo(() => onMovementClick({
    history, dispatch, t, getCurrencySymbol,
  }), [dispatch, history, t, getCurrencySymbol])

  return (
    <>
      <div className={`header ${Classes.TEXT_MUTED}`}>
        {t('grid:balances')}
        <div className={cx(Classes.DIVIDER, 'divider')} />
      </div>
      <BalancesContainer
        showTransfer
        onTransferClick={handleMovementClick}
      />
    </>
  )
}

Balances.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default memo(Balances)
