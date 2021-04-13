/* eslint-disable import/prefer-default-export */
import _values from 'lodash/values'
import PropTypes from 'prop-types'

import { defaultBaseCcy, defaultQuoteCcy } from '../functions/config.selectors'

export const TEXT_ALIGNMENT = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
}

export const DATA_MAPPING = {
  selector: PropTypes.string,
  format: PropTypes.func,
  renderer: PropTypes.func,
}

export const TRADE_TYPES = {
  MARKET: 'market',
  USER: 'user',
}
export const TRADE_TYPES_ARR = _values(TRADE_TYPES)
export const TRADE_PAGE_SIZE = 24

export const PROP_GRID_ITEM = {
  component: PropTypes.elementType.isRequired,
  defaults: PropTypes.object, // grid default values
  id: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export const PROP_GRID_CONFIG = {
  visible: PropTypes.arrayOf(PropTypes.string),
  notVisible: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.objectOf(PropTypes.shape(PROP_GRID_ITEM)),
}

export const PROP_LAYOUT_CONFIG = {
  available: PropTypes.arrayOf(PropTypes.shape(PROP_GRID_ITEM)),
  defaultColumns: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
  defaultLayout: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape(PROP_GRID_ITEM),
          PropTypes.func,
        ]),
      ),
    ),
  ),
}

export const GRID_PADDING_X = 12
export const GRID_PADDING_Y = 8

export const PROP_DEFAULT_CCYS = {
  props: {
    baseCcy: PropTypes.string,
    quoteCcy: PropTypes.string,
  },
  defaults: {
    baseCcy: defaultBaseCcy,
    quoteCcy: defaultQuoteCcy,
  },
}
