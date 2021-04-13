import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'
import _get from 'lodash/get'
import _isFunction from 'lodash/isFunction'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { withContentRect } from 'react-measure'

import {
  PROP_GRID_ITEM,
  GRID_PADDING_X,
  GRID_PADDING_Y,
} from '../../common/props'
import { Button } from '../../components'
import { PAIR_URL_SEPARATOR } from '../../redux/constants/UI.constants'
import gridBalances from './items/grid.balances'
import gridOrderform from './items/grid.orderform'
import gridTickerList from './items/grid.tickerlist'

const GridItem = (props) => {
  const {
    componentLayout,
    urlPair,
    formattedPair,
    authenticated,
    onRemoveComponent,
    isEditing,
    onTickerChange,
    onTransferClick,
    onUpdateLayout,
    measureRef,
    contentRect,
  } = props

  const offsetWidth = _get(contentRect, 'offset.width')
  const clientWidth = _get(contentRect, 'client.width')
  const offsetHeight = _get(contentRect, 'offset.height')
  const clientHeight = _get(contentRect, 'client.height')

  const {
    id, title, component: Component, toolbar,
  } = componentLayout

  const otherProps = {}
  const onUpdateLayoutFn = useCallback((...args) => onUpdateLayout(id, ...args), [id, onUpdateLayout])
  if (id === gridTickerList.id) {
    otherProps.onRowClick = onTickerChange
  }
  if (id === gridBalances.id) {
    otherProps.onTransferClick = onTransferClick
  }
  if (id === gridOrderform.id) {
    otherProps.onUpdateLayout = onUpdateLayoutFn
  }

  const [baseCcy, quoteCcy] = urlPair.split(PAIR_URL_SEPARATOR)

  const layoutTitle = _isFunction(title)
    ? title({ formattedPair })
    : title

  const componentName = _isFunction ? title() : title

  const className = componentName.split(' ').join('-').toLowerCase()

  return (
    <>
      <div className='grid-layout__header'>
        <div className='grid-layout__title'>
          {layoutTitle}
        </div>

        <div className='grid-layout__toolbar'>
          {_isFunction(toolbar) ? toolbar({ authenticated }) : null}

          {isEditing && (
            <Button onClick={() => onRemoveComponent(id)}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          )}
        </div>
      </div>
      <div className={cx('grid-layout__component', `grid-component__${className}`)} ref={measureRef}>
        <Component
          authenticated={authenticated}
          parentWidth={offsetWidth || clientWidth}
          parentHeight={offsetHeight || clientHeight}
          paddingX={GRID_PADDING_X}
          paddingY={GRID_PADDING_Y}
          formattedPair={formattedPair}
          baseCcy={baseCcy}
          quoteCcy={quoteCcy}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...otherProps}
        />
      </div>
    </>
  )
}

GridItem.propTypes = {
  componentLayout: PropTypes.shape(PROP_GRID_ITEM).isRequired,
  urlPair: PropTypes.string.isRequired,
  formattedPair: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
  onRemoveComponent: PropTypes.func,
  isEditing: PropTypes.bool,
  onTickerChange: PropTypes.func,
  measureRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.element) }),
  ]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  contentRect: PropTypes.object.isRequired,
}

GridItem.defaultProps = {
  authenticated: false,
  onRemoveComponent: () => {},
  isEditing: false,
  onTickerChange: () => {},
}

export default withContentRect(['offset', 'client'])(GridItem)
