import { faChartLine, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import withI18nProvider from '../../hoc/withI18nProvider'
import { Button } from '../ui'

const TradesToggle = (props) => {
  const {
    isMarket,
    toggle,
    authenticated,
  } = props
  const { t } = useTranslation()

  const handleClick = () => {
    toggle(!isMarket)
  }

  if (!authenticated) {
    return null
  }

  return (
    <Button
      minimal
      onClick={handleClick}
      title={isMarket ? t('trades:change_to_user') : t('trades:change_to_market')}
    >
      <div className={`${Classes.TRADES}__toggle`}>
        <FontAwesomeIcon icon={isMarket ? faChartLine : faUser} />
        <span>{isMarket ? t('trades:market') : t('trades:user')}</span>
      </div>
    </Button>
  )
}

TradesToggle.propTypes = {
  isMarket: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
}

TradesToggle.defaultProps = {
  isMarket: true,
  authenticated: false,
}

export default withI18nProvider(memo(TradesToggle))
