import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../Orders.container'

export default getDefaultMetadata(Component, 'Containers/Orders')

export const basic = showTemplateStory(Component)
