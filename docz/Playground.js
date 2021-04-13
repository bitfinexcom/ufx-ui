/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import copy from 'copy-text-to-clipboard'
import { useConfig } from 'docz'
import * as Icons from 'gatsby-theme-docz/src/components/Icons'
import * as styles from 'gatsby-theme-docz/src/components/Playground/styles'
import { Resizable } from 're-resizable'
import { useState } from 'react'
import {
  LiveProvider, LiveError, LivePreview, LiveEditor,
} from 'react-live'
import { jsx } from 'theme-ui'

// eslint-disable-next-line import/no-unresolved
import { usePrismTheme } from '~utils/theme'

const buttonStyle = { borderRadius: '0' }

export const Playground = ({ code, scope, language }) => {
  const {
    themeConfig: { showPlaygroundEditor, showLiveError, showLivePreview },
  } = useConfig()

  const theme = usePrismTheme()
  const [showingCode, setShowingCode] = useState(() => showPlaygroundEditor)
  const [width, setWidth] = useState(() => '100%')

  const transformCode = c => {
    if (c.startsWith('()') || c.startsWith('class')) return c
    return `<React.Fragment>${c}</React.Fragment>`
  }

  const copyCode = () => copy(code)

  const toggleCode = () => setShowingCode(s => !s)

  const resizableProps = {
    minWidth: 260,
    maxWidth: '100%',
    size: {
      width,
      height: 'auto',
    },
    style: {
      margin: '0 auto',
      border: '1px solid var(--theme-ui-colors-border,#CED4DE)',
      borderRadius: '3px',
    },
    enable: {
      top: false,
      right: true,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    },
    onResizeStop: (e, direction, ref) => {
      setWidth(ref.style.width)
    },
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Resizable {...resizableProps} data-testid='playground'>
      <LiveProvider
        code={code}
        scope={scope}
        transformCode={transformCode}
        language={language}
        theme={theme}
      >
        <div sx={styles.previewWrapper}>
          <div>
            {showLivePreview && (
              <LivePreview sx={styles.preview} data-testid='live-preview' />
            )}
            <div sx={styles.buttons} style={showingCode ? {} : { marginBottom: '20px' }}>
              <button type='button' style={buttonStyle} sx={styles.button} onClick={copyCode}>
                <Icons.Clipboard size={12} />
              </button>
              <button type='button' style={buttonStyle} sx={styles.button} onClick={toggleCode}>
                <Icons.Code size={12} />
              </button>
            </div>
          </div>
        </div>
        {showLiveError && (
          <LiveError sx={styles.error} data-testid='live-error' />
        )}
        {showingCode && (
          <div sx={styles.editor(theme)}>
            <LiveEditor data-testid='live-editor' />
          </div>
        )}
      </LiveProvider>
    </Resizable>
  )
}
