import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../common/classes'
import { MovementListContainer } from '../../containers'
import Balances from './Balances'

const Movements = (props) => {
  const { history } = props
  const { t } = useTranslation('movements')

  return (
    <div className={Classes.MOVEMENTS}>
      <Balances history={history} />
      <div className={`header movement-list ${Classes.TEXT_MUTED}`}>
        {t('recent_deposits_withdrawals')}
        <div className={cx(Classes.DIVIDER, 'divider')} />
      </div>
      <MovementListContainer />
    </div>
  )
}

Movements.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default memo(Movements)
