import { showTemplateStory, getDefaultMetadata } from '../../../../.storybook/helper'
import Component from '../Balances.container'

export default getDefaultMetadata(Component, 'Containers/Balances')

export const basic = showTemplateStory(Component)
