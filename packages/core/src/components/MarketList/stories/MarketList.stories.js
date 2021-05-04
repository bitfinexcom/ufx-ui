/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import { action } from '@storybook/addon-actions'

import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { MarketList, defaultProps } from '../MarketList'
import { data, tabs } from './MarketList.stories_data'

export default getDefaultMetadata(MarketList, 'Components/MarketList')

const props = {
  ...defaultProps,
  data,
  tabs,
  onRowClick: action('on row click'),
  favs: {},
  saveFavs: () => { },
}

export const basic = showTemplateStory(Component, props)
