/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { DepthChart } from '../DepthChart'
import props from './DepthChart.stories_data'

export default getDefaultMetadata(DepthChart, 'Components/DepthChart')

export const basic = showTemplateStory(Component, props)

export const loading = showTemplateStory(Component, {
  ...props,
  loading: true,
})
