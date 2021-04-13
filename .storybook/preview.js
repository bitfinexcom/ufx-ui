import { addDecorator } from '@storybook/react'

import { StoreDecorator } from './decorators'
import '../src/ufx-ui.scss'

addDecorator(StoreDecorator)
