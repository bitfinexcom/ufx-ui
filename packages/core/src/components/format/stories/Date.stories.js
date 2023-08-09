import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import Date from '../Date'

export default { ...getDefaultMetadata(Date), title: 'Components/format/Date' }

const props = {
  mts: 1580286340520, // Wed Jan 29 2020 15:25:40 GMT+0700
}

export const basic = showTemplateStory(Date, props)
