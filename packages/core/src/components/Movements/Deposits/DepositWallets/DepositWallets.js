import PropTypes from 'prop-types'
import React, { memo, Fragment } from 'react'

import * as Classes from '../../../../common/classes'
import withI18nProvider from '../../../../hoc/withI18nProvider'
import withResponsive from '../../../../hoc/withResponsive'
import DepositRow from './DepositRow'

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
  /**
   * The currency of wallets
   */
  currency: PropTypes.string.isRequired,
  /** The list of available wallets with addresses */
  wallets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  /**
   * The object with label names of wallets
   */
  walletNames: PropTypes.objectOf(PropTypes.string).isRequired,
  /**
   * The function, called when user click on refresh button
   */
  requestWalletAddress: PropTypes.func.isRequired,
  /**
   * The message, showing if something went wrong
   */
  errorMessage: PropTypes.string,
}

export const defaultProps = {
  errorMessage: null,
}

DepositWallets.defaultProps = defaultProps

export default withI18nProvider(withResponsive(memo(DepositWallets)))
