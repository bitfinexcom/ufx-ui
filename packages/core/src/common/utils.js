import { i18n } from '../i18n'

export const handleKeyboardEvent = (targetKeys, handler) => (event) => {
  const { key } = event
  if (targetKeys.includes(key)) {
    handler(event)
  }
}

const walletLocaleMap = {
  trading: 'wallets:name.trading_wallet_name',
  deposit: 'wallets:name.deposit_wallet_name',
  exchange: 'wallets:name.exchange_wallet_name',
  contribution: 'wallets:name.contribution_wallet_name',
  creditline: 'wallets:name.credit_wallet_name',
  conversion: 'wallets:name.conversion_wallet_name',
  derivative: 'wallets:name.derivatives_wallet_name',
}

export const getNiceWalletName = (name) => i18n.t(walletLocaleMap[name])
