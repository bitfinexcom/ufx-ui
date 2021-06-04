import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Table from '../Table'

export default getDefaultMetadata(Table, 'Components/ui/Table', {}, true)

const props = {
  children: (
    <>
      <thead>
        <tr>
          <th>Col 1</th>
          <th>Col 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
        <tr>
          <td>Cell 3</td>
          <td>Cell 4</td>
        </tr>
      </tbody>
    </>
  ),
}

export const basic = showTemplateStory(Table, props)

export const striped = showTemplateStory(Table, {
  ...props,
  striped: true,
})

export const condensed = showTemplateStory(Table, {
  ...props,
  condensed: true,
})

export const interactive = showTemplateStory(Table, {
  ...props,
  interactive: true,
})
