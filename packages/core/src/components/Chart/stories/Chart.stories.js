import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import { PROP_DEFAULT_CCYS } from '../../../common/props'
import Component from '../Chart'

export default getDefaultMetadata(Component, 'Components/Chart')

export const basic = showTemplateStory(Component)
basic.args = {
  ...PROP_DEFAULT_CCYS.defaults,
  wsID: 'tBTCUSD',
}
