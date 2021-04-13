import _isNaN from 'lodash/isNaN'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../../common/classes'
import { formatNumber } from '../../../functions/number'
import { PLATFORM_SETTINGS } from '../../../var/config'
import { Tooltip } from '../../ui'

const { AMOUNT_DECIMALS } = PLATFORM_SETTINGS

const getTitle = (amount) => {
  if (_isNaN(amount) || amount === 0) {
    return 0
  }

  const opts = {
    number: amount,
    decimals: Number(AMOUNT_DECIMALS),
    significantFigures: null,
    useGrouping: true,
  }
  return formatNumber(opts)
}

const BalancesTooltip = (props) => {
  const { children, total, available } = props
  const { t } = useTranslation('balances')

  return (
    <Tooltip
      content={(
        <div className={`${Classes.BALANCES}__amount-tooltip`}>
          <div>{t('total')} : </div>
          <div>{getTitle(total)} </div>
          <div>{t('available')} : </div>
          <div>{getTitle(available)} </div>
        </div>
      )}
      persistent
    >
      {children}
    </Tooltip>
  )
}

BalancesTooltip.propTypes = {
  total: PropTypes.number.isRequired,
  available: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
}

export default memo(BalancesTooltip)
