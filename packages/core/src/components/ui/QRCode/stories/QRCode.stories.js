import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import { QRCode } from '../QRCode'

export default getDefaultMetadata(QRCode, 'Components/ui/QRCode', {}, true)

const props = {
  value: 'testthiscode!@12',
}

export const basic = showTemplateStory(QRCode, props)
