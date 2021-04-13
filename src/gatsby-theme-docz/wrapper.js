/* eslint-disable no-restricted-imports */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react'

import { NotificationsContainer } from '../../../src/containers'
import useInjectBfxData from '../../../src/hooks/useInjectBfxData'
import { StoreProvider } from '../../../src/store'
import '../../../src/ufx-ui.css'

const wrapperStyle = { fontSize: '14px', lineHeight: '17px' }

const config = {
  addReduxStoreWrapper: true,
}

const BfxDataWrapper = ({ content }) => {
  useInjectBfxData()
  return content
}

export default ({ children }) => (
  <div style={wrapperStyle}>
    <StoreProvider value={config}>
      <BfxDataWrapper content={children} />
      <NotificationsContainer />
    </StoreProvider>
  </div>
)
