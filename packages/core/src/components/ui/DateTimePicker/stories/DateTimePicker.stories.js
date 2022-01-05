import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import DateTimePicker from '../DateTimePicker'

export default getDefaultMetadata(DateTimePicker, 'Components/ui/DateTimePicker', {}, true)

const props = {
  value: new Date(1641385191379),
  label: 'Choose date:',
  id: '111222333',
  maxDate: new Date(1641385191379),
}

export const basic = showTemplateStory(DateTimePicker, props)

export const disabled = showTemplateStory(DateTimePicker, { ...props, disabled: true, error: 'Disabled' })

export const small = showTemplateStory(DateTimePicker, { ...props, small: true })
