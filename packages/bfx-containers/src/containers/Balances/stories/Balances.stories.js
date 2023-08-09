import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import Component from '../Balances.container'

export default { ...getDefaultMetadata(Component), title: 'Containers/Balances' }

export const basic = showTemplateStory(Component)
