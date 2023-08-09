/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import { action } from '@storybook/addon-actions'

import {
  orders, asks, bids, tAsks, tBids,
} from './Book.stories_data'
import { showTemplateStory, getDefaultMetadata } from '../../../../../storybook/.storybook/helper'
import Component, { Book, defaultProps } from '../Book'
import { BOOK_VIZ_TYPES, DISPLAYED_ROWS, DEFAULT_ZOOM } from '../Book.constants'

export default { ...getDefaultMetadata(Book), title: 'Components/Book' }

const props = {
  ...defaultProps,
  asks,
  bids,
  tAsks,
  tBids,
  pAsks: Object.keys(asks).map(Number),
  pBids: Object.keys(bids).map(Number),
  orders,
  online: true,
  onRowClick: action('row clicked!'),
  cancelOrder: action('cancel order'),
}

export const basic = showTemplateStory(Component, props)
/* customisation for props-table */
basic.argTypes = {
  bookViz: {
    table: {
      defaultValue: { summary: BOOK_VIZ_TYPES.CUMULATIVE },
    },
    control: {
      type: 'radio',
      options: Object.values(BOOK_VIZ_TYPES),
    },
  },
  numberOfRows: {
    table: {
      defaultValue: { summary: DISPLAYED_ROWS },
    },
  },
  zoom: {
    table: {
      defaultValue: { summary: DEFAULT_ZOOM },
    },
  },
}

export const loading = showTemplateStory(Component, {
  ...props,
  loading: true,
})

export const offline = showTemplateStory(Component, {
  ...props,
  online: false,
})

export const emptyBook = showTemplateStory(Component, {
  ...props,
  pAsks: [],
  pBids: [],
})
