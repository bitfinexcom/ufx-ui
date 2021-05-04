import { addDecorator } from '@storybook/react'

import { StoreDecorator } from './decorators'

import '../../bfx-containers/src/ufx-bfx-containers.scss'

addDecorator(StoreDecorator)
