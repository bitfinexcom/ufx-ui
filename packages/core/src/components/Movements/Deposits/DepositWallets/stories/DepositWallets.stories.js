import { getDefaultMetadata, showTemplateStory } from '../../../../../../../storybook/.storybook/helper'
import Component, { DepositWallets, defaultProps } from '../DepositWallets'

const wallets = [
  { name: 'exchange', address: '12qQVmzfyGz3AbYmjjPEg9VQ5Cy6UoeyWV' },
  { name: 'trading', address: null },
]

export default getDefaultMetadata(DepositWallets, 'Components/Movements/DepositWallets')

const props = {
  ...defaultProps,
  currency: 'BTC',
  requestWalletAddress: () => alert('New wallet address was requested'),
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
