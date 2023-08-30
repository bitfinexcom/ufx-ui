/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions'

import { data, tabs } from './MarketList.stories_data'
import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { MarketList, defaultProps } from '../MarketList'

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
