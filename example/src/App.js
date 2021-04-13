import React from 'react'

import {
  StoreProvider,
} from 'ufx-ui'
import "ufx-ui/src/ufx-ui.scss"

import './index.scss'

import UfxPages from './UfxPages'

const config = {
  lang: localStorage.getItem('locale3'),
  addReduxAndRouterProvider: true,
  timezoneOffset: 330,
  timeFormat: 'DD-MM-YY HH:mm:ss',
};

const App = () => {
  return (
    <StoreProvider value={config}>
      <div className='app'>
        <UfxPages />
      </div>
    </StoreProvider>
  )
}

export default App
