import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import { ExternalLink } from '../ExternalLink'

export default { ...getDefaultMetadata(ExternalLink, {}, true), title: 'Components/ui/ExternalLink' }

const props = {
  link: 'https://www.bitfinex.com',
  children: 'Go to Bitfinex',
}

export const basic = showTemplateStory(ExternalLink, props)
