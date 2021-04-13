import React from 'react'

import {
  useInjectBfxData,
  Layout,
} from 'ufx-ui'


const UfxPages = () => {
  useInjectBfxData()
  return <Layout />
}

export default UfxPages

