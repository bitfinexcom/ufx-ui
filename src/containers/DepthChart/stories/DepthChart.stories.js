import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import Component from '../DepthChart.container'

export default getDefaultMetadata(Component, 'Containers/DepthChart')

export const basic = showTemplateStory(Component)
