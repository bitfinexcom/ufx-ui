import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import Component, { Balances, defaultProps } from '../Balances'
import { data } from './Balances.stories_data'

export default getDefaultMetadata(Balances, 'Components/Balances')

const props = {
  ...defaultProps,
  balances: data,
}

export const basic = showTemplateStory(Component, props)
