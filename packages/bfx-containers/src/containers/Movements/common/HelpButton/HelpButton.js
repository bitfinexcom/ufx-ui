import { Classes, Button, Dialog } from '@ufx-ui/core'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { useState, memo } from 'react'
import { useTranslation } from 'react-i18next'

const HelpButton = ({ helpMessage, children }) => {
  const { t } = useTranslation('movements')
  const [showHelp, setShowHelp] = useState(false)

  const handleShowHelp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowHelp(true)
  }

  return (
    <>
      <Button
        className={cx(Classes.HELP_BUTTON, Classes.TEXT_MUTED)}
        onClick={handleShowHelp}
      >
        {children}
      </Button>

      <Dialog
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title={t('help')}
      >
        {helpMessage}
      </Dialog>
    </>
  )
}

HelpButton.propTypes = {
  helpMessage: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
}

export default memo(HelpButton)
