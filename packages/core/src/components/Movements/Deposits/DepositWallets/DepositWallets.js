import PropTypes from 'prop-types'
import React, { memo, Fragment } from 'react'

import DepositRow from './DepositRow'
import * as Classes from '../../../../common/classes'
import withI18nProvider from '../../../../hoc/withI18nProvider'
import withResponsive from '../../../../hoc/withResponsive'

export const DepositWallets = ({
  currency,
  wallets,
  walletNames,
  requestWalletAddress,
  errorMessage,
}) => (
  <div className={Classes.DEPOSIT_WALLETS}>
    {wallets.map((wallet, index) => (
      <Fragment key={wallet.name}>
        <DepositRow
          currency={currency}
          wallet={wallet}
          walletNames={walletNames}
          requestWalletAddress={requestWalletAddress}
          errorMessage={errorMessage}
        />
        {(index !== wallets.length - 1) && <div className={Classes.DIVIDER} />}
      </Fragment>
    ))}
  </div>
)

DepositWallets.propTypes = {
  currency: PropTypes.string.isRequired,
  wallets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  walletNames: PropTypes.objectOf(PropTypes.string).isRequired,
  requestWalletAddress: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

export const defaultProps = {
  errorMessage: null,
}

DepositWallets.defaultProps = defaultProps

export default withI18nProvider(withResponsive(memo(DepositWallets)))
