import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Label from '../Label'

export default { ...getDefaultMetadata(Label, {}, true), title: 'Components/ui/Label' }

const props = {
  label: 'Label',
}

export const basic = showTemplateStory(Label, props)
