import { getDefaultMetadata, showTemplateStory } from '../../../../.storybook/helper'
import { PROP_DEFAULT_CCYS } from '../../../common/props'
import Component from '../OrderForm.container'

export default getDefaultMetadata(Component, 'Containers/OrderForm')

export const basic = showTemplateStory(Component)
basic.args = PROP_DEFAULT_CCYS.defaults
