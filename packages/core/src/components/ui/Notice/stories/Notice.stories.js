import { faMagic } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _map from 'lodash/map'
import _startCase from 'lodash/startCase'
import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Notice from '../Notice'
import { NOTICE_TYPES } from '../Notice.constants'

export default getDefaultMetadata(Notice, 'Components/ui/Notice', {}, true)

const props = {
  children: 'Notice content',
  title: 'Notice title',
  icon: <FontAwesomeIcon icon={faMagic} />,
}

export const basic = showTemplateStory(Notice, props)

export const types = () => (
  <>
    {_map(NOTICE_TYPES, i => <Notice key={i} type={i}>{_startCase(i) || 'None'}</Notice>)}
  </>
)
