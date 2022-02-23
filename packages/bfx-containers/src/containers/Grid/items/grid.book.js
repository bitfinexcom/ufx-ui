import { i18n } from '@ufx-ui/core'
import React from 'react'

import { BookContainer as Book, BookToolbarContainer as BookToolbar } from '../../Book'

export default {
  id: 'orderbook',
  component: Book,
  defaults: {
    minH: 15,
    h: 15.8,
    minW: 6,
    w: 6,
    static: false,
  },
  title: (args) => {
    if (args) {
      const { formattedPair } = args
      return `${i18n.t('grid:order_book')} (${formattedPair})`
    }
    return i18n.t('grid:order_book')
  },
  toolbar: () => (
    <BookToolbar />
  ),
}
