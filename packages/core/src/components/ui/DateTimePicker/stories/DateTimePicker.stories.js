import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import { DateTimePicker } from '../DateTimePicker'

export default { ...getDefaultMetadata(DateTimePicker, {}, true), title: 'Components/ui/DateTimePicker' }

const props = {
  value: new Date('Wed, 05 Jan 2022 11:19:51 GMT'),
  label: 'Choose date:',
  id: '111222333',
  maxDate: new Date('Wed, 05 Jan 2022 12:19:51 GMT'),
}

export const basic = showTemplateStory(DateTimePicker, props)

export const disabled = showTemplateStory(DateTimePicker, { ...props, disabled: true, error: 'Disabled' })

export const small = showTemplateStory(DateTimePicker, { ...props, small: true })
