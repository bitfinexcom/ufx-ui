import { columns, data } from './VirtualTable.stories_data'
import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import VirtualTable from '../VirtualTable'

export default { ...getDefaultMetadata(VirtualTable, {}, false), title: 'Components/ui/VirtualTable' }

const props = {
  data,
  columns,
  defaultSortBy: 'id',
  defaultSortDirection: 'ASC',
}

export const basic = showTemplateStory(VirtualTable, props)
