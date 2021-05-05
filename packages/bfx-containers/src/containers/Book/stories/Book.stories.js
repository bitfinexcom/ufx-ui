import { PROP_DEFAULT_CCYS } from '@ufx-ui/core'

import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../Book.container'

export default getDefaultMetadata(Component, 'Containers/Book')

export const basic = showTemplateStory(Component)
basic.args = PROP_DEFAULT_CCYS.defaults
