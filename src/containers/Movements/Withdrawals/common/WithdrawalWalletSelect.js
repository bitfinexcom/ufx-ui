import PropTypes from 'prop-types'
import React, { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getNiceWalletName } from '../../../../common/utils'
import { Dropdown } from '../../../../components/ui'
import { NOT_ENABLED } from '../../constants'
import { WALLET_PROPS } from '../../Movements.props'

const WithdrawalWalletSelect = ({
  value,
  onChange,
  wallets,
  hideLabel,
}) => {
  const { t } = useTranslation('withdrawals')

  const walletOptions = useMemo(() => wallets.reduce(
    (acc, { name, address = '' }) => {
      if (!address.match(NOT_ENABLED)) {
        acc[name] = `${getNiceWalletName(name)} ${t('wallet')}`
      }
      return acc
    }, {},
  ), [t, wallets])

  return (
    <>
      {!hideLabel && <div className='wallet-label label'>{t('wallet')}</div>}
      <Dropdown
        small
        className='wallet-input'
        options={walletOptions}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

WithdrawalWalletSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  wallets: WALLET_PROPS.isRequired,
  hideLabel: PropTypes.bool,
}

WithdrawalWalletSelect.defaultProps = {
  hideLabel: false,
}

export default memo(WithdrawalWalletSelect)
