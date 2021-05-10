import PropTypes from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import withI18nProvider from '../../hoc/withI18nProvider'
import Button from '../ui/Button'

const EditLayoutButton = (props) => {
  const {
    layoutIsEditable,
    enableEditLayout,
    closeEditLayout,
  } = props
  const { t } = useTranslation()

  const label = layoutIsEditable
    ? 'close_edit'
    : 'edit_layout'

  const handleClick = () => {
    if (layoutIsEditable) {
      return closeEditLayout()
    }
    return enableEditLayout()
  }

  return (
    <Button
      small
      minimal
      onClick={handleClick}
      className='edit-button'
    >
      {t(`grid:${label}`)}
    </Button>
  )
}

EditLayoutButton.propTypes = {
  enableEditLayout: PropTypes.func,
  layoutIsEditable: PropTypes.bool,
  closeEditLayout: PropTypes.func,
}

EditLayoutButton.defaultProps = {
  enableEditLayout: () => {},
  layoutIsEditable: false,
  closeEditLayout: () => {},
}

export default withI18nProvider(EditLayoutButton)
