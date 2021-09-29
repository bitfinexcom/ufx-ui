import { PROP_DEFAULT_CCYS } from '@ufx-ui/core'

import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../Chart.container'

export default getDefaultMetadata(Component, 'Containers/Chart')

export const basic = showTemplateStory(Component)
basic.args = {
  ...PROP_DEFAULT_CCYS.defaults,
  wsID: 'tBTCUSD',
}
