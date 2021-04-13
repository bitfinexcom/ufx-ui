import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import Component from '../OrderHistory.container'

export default getDefaultMetadata(Component, 'Containers/OrderHistory')

export const basic = showTemplateStory(Component)
