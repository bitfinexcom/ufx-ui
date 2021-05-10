import React, { forwardRef } from 'react'
import { I18nextProvider } from 'react-i18next'

import { i18n } from '../i18n'

// disabled arrow-callback rule to have display name in devtools instead of Anonymous
// eslint-disable-next-line prefer-arrow-callback
const withI18nProvider = (Component) => forwardRef(function withI18nProviderComp(props, ref) {
  return (
    <I18nextProvider i18n={i18n}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component ref={ref} {...props} />
    </I18nextProvider>
  )
})

withI18nProvider.displayName = 'withI18nProvider'

export default (withI18nProvider)
