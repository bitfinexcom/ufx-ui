import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import { PROP_DEFAULT_CCYS } from '../../../common/props'
import Component from '../Trades.wrapper'

export default getDefaultMetadata(Component, 'Containers/Trades')

export const basic = showTemplateStory(Component)
basic.args = PROP_DEFAULT_CCYS.defaults
