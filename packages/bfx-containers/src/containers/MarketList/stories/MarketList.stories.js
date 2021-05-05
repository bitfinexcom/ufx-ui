import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../MarketList.container'

export default getDefaultMetadata(Component, 'Containers/MarketList')

export const basic = showTemplateStory(Component)
