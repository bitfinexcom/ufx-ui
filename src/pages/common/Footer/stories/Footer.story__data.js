/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react'

import { EditLayoutButton } from '../../../../components'
import { TYPES } from '../Footer.constants'

const IconTelegram = ''
const IconFacebook = ''
const IconReddit = ''
const IconLinkedIn = ''
const IconTwitter = ''

const options = {
  en: 'English',
  cn: '简体中文',
}

// eslint-disable-next-line no-console
const onChangeLang = (e) => console.log('changed language to ', e)

export const bottomContents = () => ([
  [
    {
      type: TYPES.TEXT,
      label: 'Copyright © 2021 companyname All rights reserved',
    },
  ],
])

export const footerLinks = (t) => ([
  [
    {
      type: TYPES.IMAGE,
      src: '',
      alt: 'logo',
    },
  ],
  [
    {
      type: TYPES.TITLE,
      label: 'Main Menu',
    },
    {
      type: TYPES.TEXT_LINK,
      label: t('quick_swap'),
      href: '/quickswap',
      target: '_self',
      disabled: true,
    },
    {
      type: TYPES.TEXT_LINK,
      label: t('transfer'),
      href: '/transfer',
      target: '_self',
    },
    {
      type: TYPES.TEXT_LINK,
      label: t('fees'),
      href: '/fees',
    },
  ],
  [
    {
      type: TYPES.TITLE,
      label: 'Follow Us',
    },
    {
      type: TYPES.IMAGE,
      src: IconTelegram,
      alt: 'Telegram',
      href: 'https://t.me/',
    },
    {
      type: TYPES.IMAGE,
      src: IconFacebook,
      alt: 'Facebook',
      href: 'https://facebook.com/',
    },
    {
      type: TYPES.IMAGE,
      src: IconReddit,
      alt: 'Reddit',
      href: 'https://reddit.com/r/',
    },
    {
      type: TYPES.IMAGE,
      src: IconLinkedIn,
      alt: 'Linkedin',
      href: 'https://www.linkedin.com/company/',
    },
    {
      type: TYPES.IMAGE,
      src: IconTwitter,
      alt: 'Twitter',
      href: 'https://twitter.com/',
    },
  ],
  [
    {
      type: TYPES.DROPDOWN,
      options,
      value: 'en',
      onChange: onChangeLang,
    },
  ],
  [
    {
      type: TYPES.TEXT,
      text: 'this is plain text',
    },
  ],
])

export const rightContents = () => ([
  [
    {
      type: TYPES.JSX,
      Component: () => {
        const [isEditEnable, setEditEnable] = useState(false)
        return (
          <EditLayoutButton
            layoutIsEditable={isEditEnable}
            enableEditLayout={() => setEditEnable(true)}
            closeEditLayout={() => setEditEnable(false)}
          />
        )
      },
    },
  ],
])
