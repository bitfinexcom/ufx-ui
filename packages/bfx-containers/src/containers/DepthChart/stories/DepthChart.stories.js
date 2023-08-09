import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component from '../DepthChart.container'

export default { ...getDefaultMetadata(Component), title: 'Containers/DepthChart' }

export const basic = showTemplateStory(Component)
