import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import FullDate from '../FullDate'

export default getDefaultMetadata(FullDate, 'Components/format/FullDate')

const props = {
  ts: 1580286340520, // Monday, Jan 29, 2021 15:25:40 GMT+0700
}

export const basic = showTemplateStory(FullDate, props)
