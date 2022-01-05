import { Classes, PROP_LAYOUT_CONFIG } from '@ufx-ui/core'
import PropTypes from 'prop-types'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '../../containers/Grid'
import withI18nProvider from '../../hoc/withI18nProvider'
import { getCurrencySymbolMemo } from '../../redux/selectors/currencies.selectors'
import { onMovementClick } from '../Movements/Balances'

const Trading = (props) => {
  const {
    layoutConfig,
    onTickerChange,
    history,
  } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const getCurrencySymbol = useSelector(getCurrencySymbolMemo)

  const handleMovementClick = useMemo(() => onMovementClick({
    history, dispatch, t, getCurrencySymbol,
  }), [dispatch, history, t, getCurrencySymbol])

  return (
    <div className={Classes.TRADING}>
      <Grid
        layoutConfig={layoutConfig}
        onTickerChange={onTickerChange}
        onTransferClick={handleMovementClick}
      />
    </div>
  )
}

Trading.propTypes = {
  layoutConfig: PropTypes.shape(PROP_LAYOUT_CONFIG).isRequired,
  onTickerChange: PropTypes.func.isRequired,
}

export default withI18nProvider(memo(Trading))
