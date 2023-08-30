/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types'
import React from 'react'

import renderer from './TokenList.renderer'
import { Dropdown } from '../../FormikFields'

const TokenList = (props) => (
  <Dropdown
    searchable
    optionRenderer={renderer}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

TokenList.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
}

export default TokenList
