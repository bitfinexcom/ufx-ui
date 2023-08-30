/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'

import data from './TickerList.stories_data'
import { getDefaultMetadata, showTemplateStory } from '../../../../../storybook/.storybook/helper'
import Component, { TickerList, defaultProps } from '../TickerList'

export default getDefaultMetadata(TickerList, 'Components/TickerList')

const props = {
  ...defaultProps,
  data,
  onRowClick: action('on row click'),
  favs: {},
  saveFavs: () => { },
  showOnlyFavs: false,
  setShowOnlyFavs: () => { },
}

const Wrapper = (compProps) => (
  <Component
    {...props}
    {...compProps}
  />
)

const volumeUnitList = {
  UST: 'USDt',
  EOS: 'EOS',
  SELF: 'SELF',
}

const WithVolumeUnit = () => {
  const [favs, setFavs] = useState({})
  const [showOnlyFavs, setShowOnlyFavs] = useState(false)
  const [volumeUnit, setVolumeUnit] = useState('UST')

  return (
    <Wrapper
      favs={favs}
      saveFavs={setFavs}
      showOnlyFavs={showOnlyFavs}
      setShowOnlyFavs={setShowOnlyFavs}
      showVolumeUnit
      volumeUnitList={volumeUnitList}
      volumeUnit={volumeUnit}
      setVolumeUnit={setVolumeUnit}
    />
  )
}

export const basic = showTemplateStory(Component, props)

export const volumeUnit = showTemplateStory(WithVolumeUnit, props)
