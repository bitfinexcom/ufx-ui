import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import { terser } from 'rollup-plugin-terser'
// import visualizer from 'rollup-plugin-visualizer'

import pkg from './package.json'

const input = pkg.source
const { peerDependencies } = pkg
const external = Object.keys(peerDependencies)
external.push('crypto')

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-redux': 'ReactRedux',
  crypto: 'Crypto',
}

const commonjsArgs = {
  include: 'node_modules/**',
  // needed for react-is via react-redux
  // https://stackoverflow.com/questions/50080893/rollup-error-isvalidelementtype-is-not-exported-by-node-modules-react-is-inde/50098540
  namedExports: {
    'node_modules/react-is/index.js': [
      'isValidElementType',
      'isMemo',
      'isContextConsumer',
    ],
    'node_modules/scheduler/index.js': [
      'unstable_runWithPriority',
      'unstable_LowPriority',
      'LowPriority',
    ],
  },
}

// Treat as externals all not relative and not absolute paths
// e.g. 'react', 'lodash'
const excludeAllExternals = (id) => !id.startsWith('.') && !id.startsWith('/')

const getBabelOptions = () => ({
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  plugins: [['@babel/transform-runtime']],
})

const snapshotArgs = process.env.SNAPSHOT === 'match'
  ? {
    matchSnapshot: true,
    threshold: 1000,
  }
  : {}

const baseConfig = () => ({
  input,
  plugins: [
    json(),
    url(),
    svgr(),
    resolve({ preferBuiltins: true }),
    babel(getBabelOptions()),
    sizeSnapshot(snapshotArgs),
    // To debug bundle size
    // visualizer(),
  ],
})

const baseUmdConfig = (minified) => {
  const config = Object.assign(baseConfig(), {
    external,
  })
  config.plugins.push(
    commonjs(commonjsArgs),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  )

  if (minified) {
    config.plugins.push(terser())
  }

  return config
}

/*
  COMMONJS / MODULE CONFIG
  ------------------------
  Goal of this configuration is to generate bundles to be consumed by bundlers.
  This configuration is not minimized and will exclude all dependencies.
*/
const libConfig = baseConfig()
// Do not include any of the dependencies
libConfig.external = excludeAllExternals
libConfig.output = [
  {
    name: 'MicrofinexUI',
    file: pkg.main,
    format: 'cjs',
  },
  {
    name: 'MicrofinexUI',
    file: pkg.module,
    format: 'es',
  },
]

/*
  UMD CONFIG
  ----------
  Goal of this configuration is to be directly included on web pages.
  This configuration will include dependencies that are not
  marked as peer dependencies.
*/
const umdConfig = baseUmdConfig(false)
umdConfig.external = external
umdConfig.output = [
  {
    globals,
    name: 'MicrofinexUI',
    file: 'dist/ufx-ui.umd.js',
    format: 'umd',
  },
]

const umdConfigMin = baseUmdConfig(true)
umdConfigMin.external = external
umdConfigMin.output = [
  {
    globals,
    name: 'MicrofinexUI',
    file: 'dist/ufx-ui.umd.min.js',
    format: 'umd',
  },
]

export default [
  libConfig,
  umdConfig,
  umdConfigMin,
]
