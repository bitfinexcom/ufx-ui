import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import * as Classes from '../../../../../common/classes'
import { getNiceWalletName } from '../../../../../common/utils'
import PrettyBalance from './PrettyBalance'

const LOCALE_OPTIONS = [
  'en-US',
  { useGrouping: false, maximumFractionDigits: 8 },
]

const AvailableBalanceRow = ({
  wallet,
  balance,
  onBalanceClick,
}) => {
  const { t } = useTranslation('withdrawals')
  const walletName = `${getNiceWalletName(wallet)} ${t('wallet')}`

  const handleBalanceClick = balance > 0
    ? () => (
      onBalanceClick({
        balance: balance.toLocaleString(...LOCALE_OPTIONS),
        wallet,
      })
    )
    : null

  return (
    <tr>
      <td>{walletName}</td>
      <td
        className={cx(Classes.RIGHT_TO_LEFT, { pointer: balance > 0 })}
        onClick={handleBalanceClick}
        onKeyPress={handleBalanceClick}
        role='gridcell'
        tabIndex='0'
      >
        <PrettyBalance balance={balance} />
      </td>
    </tr>
  )
}

AvailableBalanceRow.propTypes = {
  wallet: PropTypes.string.isRequired,
  balance: PropTypes.number,
  onBalanceClick: PropTypes.func,
}

AvailableBalanceRow.defaultProps = {
  balance: {},
  onBalanceClick: () => {},
}

export default memo(AvailableBalanceRow)
