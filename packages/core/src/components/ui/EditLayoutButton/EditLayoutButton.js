import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import withI18nProvider from '../../../hoc/withI18nProvider'
import Button from '../Button'

export const EditLayoutButton = ({
  layoutIsEditable,
  enableEditLayout,
  closeEditLayout,
}) => {
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
  /**
   * Callback, that enable editing layout (open modal)
   */
  enableEditLayout: PropTypes.func,
  /**
   * If true, button's text is "Edit layout",
   * if false - "Close edit"
   */
  layoutIsEditable: PropTypes.bool,
  /**
   * Callback, that close editing (close modal)
   */
  closeEditLayout: PropTypes.func,
}

EditLayoutButton.defaultProps = {
  enableEditLayout: () => {},
  layoutIsEditable: false,
  closeEditLayout: () => {},
}

export default withI18nProvider(memo(EditLayoutButton))
