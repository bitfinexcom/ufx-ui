import _map from 'lodash/map'
import _startCase from 'lodash/startCase'
import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Intent, { INTENT_TYPES_ARR } from '../../../../common/intent'
import * as Props from '../../../../common/props'
import Heading, { HEADING_TAGS } from '../Heading'

const { TEXT_ALIGNMENT } = Props

export default getDefaultMetadata(Heading, 'Components/ui/Heading', {}, true)

const props = {
  children: 'Heading',
}

export const basic = showTemplateStory(Heading, props)
basic.argTypes = {
  intent: {
    control: {
      type: 'select',
      options: INTENT_TYPES_ARR,
    },
  },
  alignText: {
    control: {
      type: 'select',
      options: Object.values(TEXT_ALIGNMENT),
    },
  },
}
basic.args = {
  ...props,
  intent: Intent.NONE,
  alignText: TEXT_ALIGNMENT.LEFT,
}

export const variants = () => (
  <>
    {_map(HEADING_TAGS, i => <Heading key={i} tag={i}>{_startCase(i) || 'Default'}</Heading>)}
  </>
)

export const intents = () => (
  <>
    {_map(INTENT_TYPES_ARR, i => <Heading key={i} intent={i} tag={HEADING_TAGS.H5}>{_startCase(i) || 'Default'}</Heading>)}
  </>
)

export const alignment = () => (
  <>
    {_map(TEXT_ALIGNMENT, i => <Heading key={i} alignText={i} tag={HEADING_TAGS.H5}>{_startCase(i) || 'Default'}</Heading>)}
  </>
)
