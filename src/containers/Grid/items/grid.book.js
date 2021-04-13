import React from 'react'

import { i18n } from '../../../i18n'
import { BookContainer as Book, BookToolbarContainer as BookToolbar } from '../../Book'

export default {
  id: 'orderbook',
  component: Book,
  defaults: {
    h: 15.8,
    minW: 6,
    minH: 16,
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
