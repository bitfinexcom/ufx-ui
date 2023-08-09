import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import { QRCode } from '../QRCode'

export default { ...getDefaultMetadata(QRCode, {}, true), title: 'Components/ui/QRCode' }

const props = {
  value: 'testthiscode!@12',
}

export const basic = showTemplateStory(QRCode, props)
