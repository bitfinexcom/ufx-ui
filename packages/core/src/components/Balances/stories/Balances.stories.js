/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react'

import {
  showTemplateStory,
  getDefaultMetadata,
} from '../../../../../storybook/.storybook/helper'
import C, { Balances } from '../Balances'
import { data } from './Balances.stories_data'

export default getDefaultMetadata(Balances, 'Components/Balances')

const Component = (props) => {
  const [hideSmallBalances, setHideSmallBalances] = useState(true)

  return (
    <C
      hideSmallBalances={hideSmallBalances}
      setHideSmallBalances={setHideSmallBalances}
      balances={data}
      {...props}
    />
  )
}

export const basic = showTemplateStory(Component, {})

export const withTransferButtons = showTemplateStory(Component, {
  showTransfer: true,
  handleDepositClick: () => alert('User is going to deposit current wallet'),
  handleWithdrawClick: () => alert('User is going to withdraw from current wallet'),
})
