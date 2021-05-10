import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import ExternalLink from '../ExternalLink'

export default getDefaultMetadata(ExternalLink, 'Components/ui/ExternalLink', {}, true)

const props = {
  link: 'https://www.bitfinex.com',
  children: 'Go to Bitfinex',
}

export const basic = showTemplateStory(ExternalLink, props)
