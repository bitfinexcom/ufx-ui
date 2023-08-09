import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import { CooldownButton } from '../CooldownButton'

export default { ...getDefaultMetadata(CooldownButton, {}, true), title: 'Components/ui/CooldownButton' }

export const basic = showTemplateStory(CooldownButton, {})
