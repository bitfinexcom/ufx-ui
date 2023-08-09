/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import PrettyDate from '../PrettyDate'

export default { ...getDefaultMetadata(PrettyDate), title: 'Components/format/PrettyDate' }

const props = {
  mts: 1571670340000, // Monday, October 21, 2019 8:35:40 PM GMT+05:30
}

export const basic = showTemplateStory(PrettyDate, props)

const style = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
}

export const showYear = () => {
  const mts = new Date().getMilliseconds()
  return (
    <div style={style}>
      <div>Today</div>
      <div><PrettyDate mts={mts} /></div>
      <div>Today with year</div>
      <div><PrettyDate mts={mts} showYear /></div>
    </div>
  )
}

export const hideDay = () => <PrettyDate {...props} showDay={false} />

export const abbreviate = () => <PrettyDate {...props} abbreviate />

export const onlyMonthDay = () => <PrettyDate {...props} monthDayOnly />
