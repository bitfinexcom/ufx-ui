import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import FullDate from '../FullDate'

export default getDefaultMetadata(FullDate, 'Components/format/FullDate')

const props = {
  ts: 1580286340520, // Monday, October 21, 2019 8:35:40 PM GMT+05:30
}

export const basic = showTemplateStory(FullDate, props)
