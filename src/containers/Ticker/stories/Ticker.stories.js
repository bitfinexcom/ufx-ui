import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import { PROP_DEFAULT_CCYS } from '../../../common/props'
import Component from '../Ticker.container'

export default getDefaultMetadata(Component, 'Containers/Ticker')

export const basic = showTemplateStory(Component)
basic.args = PROP_DEFAULT_CCYS.defaults
