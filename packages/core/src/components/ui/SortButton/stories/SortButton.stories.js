import React, { useState } from 'react'

import {
  showTemplateStory,
  getDefaultMetadata,
} from '../../../../../../storybook/.storybook/helper'
import { Button } from '../../Button/Button'
import { SortableButton } from '../SortButton'

export default { ...getDefaultMetadata(SortableButton, {}, true), title: 'Components/ui/SortableButton' }

const props = {
  sortAscending: true,
}

const Component = ({ sortAscending }) => {
  const [isAsc, setIsAsc] = useState(sortAscending)

  const toggleSorting = () => setIsAsc(!isAsc)

  return (
    <SortableButton
      sortAscending={isAsc}
      content={<Button>Balance</Button>}
      onSortClick={toggleSorting}
    />
  )
}

export const basic = showTemplateStory(Component, props)
