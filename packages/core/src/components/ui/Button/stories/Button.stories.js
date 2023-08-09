/* eslint-disable react/jsx-props-no-spreading */
import _map from 'lodash/map'
import _startCase from 'lodash/startCase'
import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Intent, { INTENT_TYPES_ARR } from '../../../../common/intent'
import { Button } from '../Button'

export default { ...getDefaultMetadata(Button, {}, true), title: 'Components/ui/Button' }

export const basic = showTemplateStory(Button, {})
basic.argTypes = {
  intent: {
    control: {
      type: 'select',
      options: INTENT_TYPES_ARR,
    },
  },
}
basic.args = {
  children: 'Button Text',
  intent: Intent.PRIMARY,
}

export const variants = () => (
  <>
    {_map(INTENT_TYPES_ARR, i => <Button key={i} intent={i}>{_startCase(i) || 'Default'}</Button>)}
    {_map(INTENT_TYPES_ARR, i => <Button key={i} intent={i} outline>{`${_startCase(i)} Outline`}</Button>)}
  </>
)

export const sizes = () => (
  <>
    <Button intent={Intent.PRIMARY}>Default</Button>
    <Button intent={Intent.PRIMARY} small>Small</Button>
    <Button intent={Intent.PRIMARY} minimal>Minimal</Button>
  </>
)

export const loading = () => (
  <Button
    intent={Intent.PRIMARY}
    loading
  >Loading
  </Button>
)

export const disabled = () => (
  <Button
    intent={Intent.PRIMARY}
    disabled
  >Disabled
  </Button>
)
