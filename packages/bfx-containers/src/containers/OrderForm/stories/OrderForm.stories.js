import { PROP_DEFAULT_CCYS } from '@ufx-ui/core'

import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../OrderForm.container'

export default getDefaultMetadata(Component, 'Containers/OrderForm')

export const basic = showTemplateStory(Component)
basic.args = PROP_DEFAULT_CCYS.defaults
