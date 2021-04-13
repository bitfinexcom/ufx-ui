import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _get from 'lodash/get'
import _sum from 'lodash/sum'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../../../../common/classes'
import { Tooltip } from '../../../../../components/ui'
import Row from './AvailableBalance.Row'

// could come from getUIWallets selector, but its declarad as const to keep specific order
const WALLETS = [
  'exchange',
]

const AvailableBalanceBox = ({
  currency,
  balances,
  onBalanceClick,
  getCurrencyLabel,
  getCurrencySymbol,
}) => {
  const { t } = useTranslation('withdrawals')
  const symbol = getCurrencySymbol(currency)
  const showSymbol = currency !== symbol

  const isTotalBalanceZero = _sum(
    WALLETS.map(
      (wallet) => _get(balances, [currency, wallet, 'available'], 0),
    ),
  ) === 0

  return (
    <div className={cx(Classes.AVAILABLE_BALANCE_BOX, {
      'no-balance': isTotalBalanceZero,
    })}
    >
      <h6>
        {t('currency_available', { currency })}
        {showSymbol && (
          <div className='title-currency'>
            {' ('}
            <Tooltip
              content={getCurrencyLabel(currency)}
              placement='top'
            >
              <span className={Classes.TEXT_MUTED}>{symbol}</span>
            </Tooltip>
            {') '}
          </div>
        )}
        {' '}
        <Tooltip
          content={t('available_balance_explain')}
          placement='top'
          className={`${Classes.AVAILABLE_BALANCE_BOX}__tooltip`}
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
        </Tooltip>
      </h6>

      <table role='grid'>
        <tbody>
          {WALLETS.map((wallet) => {
            const balance = _get(
              balances,
              [currency, wallet, 'available'],
              0,
            )

            return (
              <Row
                key={wallet}
                wallet={wallet}
                balance={balance}
                onBalanceClick={onBalanceClick}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

AvailableBalanceBox.propTypes = {
  currency: PropTypes.string.isRequired,
  balances: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.shape({ available: PropTypes.number, total: PropTypes.number }),
    ),
  ).isRequired,
  getCurrencyLabel: PropTypes.func.isRequired,
  getCurrencySymbol: PropTypes.func.isRequired,
  onBalanceClick: PropTypes.func,
}

AvailableBalanceBox.defaultProps = {
  onBalanceClick: () => {},
}

export default memo(AvailableBalanceBox)
