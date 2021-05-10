import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../TickerList.container'

export default getDefaultMetadata(Component, 'Containers/TickerList')

export const basic = showTemplateStory(Component)
