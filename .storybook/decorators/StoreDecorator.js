import React from 'react'

import useInjectBfxData from '../../src/hooks/useInjectBfxData'
import { StoreProvider } from '../../src/store'

const config = {
  addReduxAndRouterProvider: true,
}

const BfxDataWrapper = ({ content }) => {
  useInjectBfxData()
  return content
}

const Wrapper = ({ children }) => (
  <StoreProvider value={config}>
    <BfxDataWrapper content={children} />
  </StoreProvider>
)

const ContainerStories = 'Containers/'

// store wrapper for storybook
const StoreDecorator = (Story, metadata) => {
  const { kind } = metadata

  // add redux wrapper only for container stories
  if(kind.includes(ContainerStories)) {
    return (
      <Wrapper>
        <Story />
      </Wrapper>
    )
  }

  return (
    <StoreProvider>
      <Story />
    </StoreProvider>
  )
}

export default StoreDecorator
