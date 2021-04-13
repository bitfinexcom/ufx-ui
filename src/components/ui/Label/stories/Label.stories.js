import { showTemplateStory, getDefaultMetadata } from '../../../../../.storybook/helper'
import Label from '../Label'

export default getDefaultMetadata(Label, 'Components/ui/Label', {}, true)

const props = {
  label: 'Label',
}

export const basic = showTemplateStory(Label, props)
