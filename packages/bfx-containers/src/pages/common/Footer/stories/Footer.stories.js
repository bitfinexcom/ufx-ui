import React from 'react'
import { useTranslation } from 'react-i18next'

import { showTemplateStory, getDefaultMetadata } from '../../../../../../storybook/.storybook/helper'
import Footer from '../Footer'
import { bottomContents, footerLinks, rightContents } from './Footer.story__data'

export default getDefaultMetadata(Footer, 'Components/pages/Footer')

const props = {
  footerData: footerLinks,
  bottomData: bottomContents,
  rightContent: rightContents,
}

const TranslatedComponent = ({ footerData, bottomData, rightContent }) => {
  const { t } = useTranslation()
  return (
    <Footer
      columns={footerData(t)}
      bottomContents={bottomData()}
      rightContents={rightContent(t)}
      mainClassName='footer__main'
      lowerClassName='footer__lower'
    />
  )
}

export const basic = showTemplateStory(TranslatedComponent, props)
