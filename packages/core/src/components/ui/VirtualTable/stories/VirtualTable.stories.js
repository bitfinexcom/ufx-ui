import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import VirtualTable from '../VirtualTable'
import { columns, data } from './VirtualTable.stories_data'

export default getDefaultMetadata(VirtualTable, 'Components/ui/VirtualTable', {}, false)

const props = {
  data,
  columns,
  defaultSortBy: 'id',
  defaultSortDirection: 'ASC',
}

export const basic = showTemplateStory(VirtualTable, props)
