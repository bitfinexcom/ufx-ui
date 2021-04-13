/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import {
  theme,
  useConfig,
  ComponentsProvider,
} from 'docz'
import { Styled, ThemeProvider } from 'theme-ui'

import { Props, Playground } from '../../../docz'

import baseComponents from '~components'
import defaultTheme from '~theme'

const Theme = ({ children }) => {
  const config = useConfig()
  const components = {
    ...baseComponents,
    props: Props,
    playground: Playground,
  }

  return (
    <ThemeProvider theme={config.themeConfig}>
      <ComponentsProvider components={components}>
        <Styled.root>{children}</Styled.root>
      </ComponentsProvider>
    </ThemeProvider>
  )
}

export default theme(defaultTheme)(Theme)
