import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../Orders.container'

export default { ...getDefaultMetadata(Component), title: 'Containers/Orders' }

export const basic = showTemplateStory(Component)
