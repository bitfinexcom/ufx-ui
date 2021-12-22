import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import CooldownButton from '../CooldownButton'

export default getDefaultMetadata(CooldownButton, 'Components/ui/CooldownButton', {}, true)

export const basic = showTemplateStory(CooldownButton, {})
