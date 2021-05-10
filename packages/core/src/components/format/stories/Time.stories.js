import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import Time from '../Time'

export default getDefaultMetadata(Time, 'Components/format/Time')

const props = {
  mts: 1580286340520, // Wed Jan 29 2020 15:25:40 GMT+0700
}

export const basic = showTemplateStory(Time, props)

export const hideSeconds = showTemplateStory(Time, {
  ...props,
  hideSeconds: true,
})
