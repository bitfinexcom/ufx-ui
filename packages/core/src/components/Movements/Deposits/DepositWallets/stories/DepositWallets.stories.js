import { getDefaultMetadata, showTemplateStory } from '../../../../../../../storybook/.storybook/helper'
import Component, { DepositWallets, defaultProps } from '../DepositWallets'

const wallets = [
  { name: 'exchange', address: '12qQVmzfyGz3AbYmjjPEg9VQ5Cy6UoeyWV' },
  { name: 'trading' },
]

export default { ...getDefaultMetadata(DepositWallets), title: 'Components/Movements/DepositWallets' }

const props = {
  ...defaultProps,
  currency: 'BTC',
  requestWalletAddress: () => {},
  wallets,
  walletNames: {
    exchange: 'Exchange Wallet',
    trading: 'Margin Wallet',
  },
}

export const basic = showTemplateStory(Component, props)

export const error = showTemplateStory(Component, {
  ...props,
  errorMessage: 'Error while getting address',
})
