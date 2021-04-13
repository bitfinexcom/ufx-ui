import PropTypes from 'prop-types'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import * as Classes from '../../common/classes'
import { PROP_LAYOUT_CONFIG } from '../../common/props'
import Grid from '../../containers/Grid'
import withI18nProvider from '../../hoc/withI18nProvider'
import { onMovementClick } from '../Movements/Balances'

const Trading = (props) => {
  const {
    layoutConfig,
    onTickerChange,
    history,
  } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleMovementClick = useMemo(() => onMovementClick({ history, dispatch, t }), [dispatch, history, t])

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
