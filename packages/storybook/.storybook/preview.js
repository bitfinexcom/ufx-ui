import { addDecorator } from '@storybook/react'

import { StoreDecorator } from './decorators'

import '../../bfx-containers/dist/css/ufx-bfx-containers.bundle.scss'

addDecorator(StoreDecorator)
