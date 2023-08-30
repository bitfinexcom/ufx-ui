import { movements, rowMapping } from './MovementList.stories_data'
import { getDefaultMetadata, showTemplateStory } from '../../../../../../storybook/.storybook/helper'
import Component, { MovementList, defaultProps } from '../MovementList'

export default getDefaultMetadata(MovementList, 'Components/Movements/MovementList')

const props = {
  ...defaultProps,
  movements,
  rowMapping,
}

export const basic = showTemplateStory(Component, props)
