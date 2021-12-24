import _map from 'lodash/map'

import {
  getDefaultMetadata,
  showTemplateStory,
} from '../../../../../../storybook/.storybook/helper'
import Intent, { INTENT_TYPES_ARR } from '../../../../common/intent'
import { Notifications } from '../Notifications'

export default getDefaultMetadata(
  Notifications,
  'Components/ui/Notifications',
  {},
  true,
)

const groupedMessages = {
  cid: '8',
  level: Intent.SUCCESS,
  message: 'Connections',
  group: [
    { cid: '1', message: 'Connected to WebSocket' },
    { cid: '2', message: 'Connected to DB' },
  ],
}

const props = {
  notifications: [
    ..._map(INTENT_TYPES_ARR, (type, index) => ({
      cid: String(index),
      level: type,
      message: type,
    })),
    groupedMessages,
  ],
}

export const variants = showTemplateStory(Notifications, props)
