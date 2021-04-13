import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'

import Button from '../Button'

const ModalHeader = (props) => {
  const {
    title,
    closeModal,
  } = props

  return (
    <div className='header'>
      <div>{title}</div>
      <Button
        className='close-button'
        onClick={closeModal}
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
    </div>
  )
}

ModalHeader.propTypes = {
  title: PropTypes.node,
  closeModal: PropTypes.func.isRequired,
}

ModalHeader.defaultProps = {
  title: null,
}

export default ModalHeader
