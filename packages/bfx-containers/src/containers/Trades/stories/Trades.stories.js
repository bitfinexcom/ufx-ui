import { PROP_DEFAULT_CCYS } from '@ufx-ui/core'

import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../Trades.wrapper'

export default { ...getDefaultMetadata(Component), title: 'Containers/Trades' }

export const basic = showTemplateStory(Component)
basic.args = PROP_DEFAULT_CCYS.defaults
