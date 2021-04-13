import {
  faSync,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../.storybook/helper'
import CooldownButton from '../CooldownButton'

export default getDefaultMetadata(CooldownButton, 'Components/ui/CooldownButton', {}, true)

const props = {
  children: <FontAwesomeIcon icon={faSync} />,
}

export const basic = showTemplateStory(CooldownButton, props)
