import { getDefaultMetadata, showTemplateStory } from '../../../../../.storybook/helper'
import Component, { MovementList, defaultProps } from '../MovementList'
import { movements, rowMapping } from './MovementList.stories_data'

export default getDefaultMetadata(MovementList, 'Components/Movements/MovementList')

const props = {
  ...defaultProps,
  movements,
  rowMapping,
}

export const basic = showTemplateStory(Component, props)
