// https://github.com/weizhenye/rollup-plugin-bundle-scss/blob/master/dist/index.js
// fixes issue in above plugin -> duplicate content in output file if used in rollup watch mode

const fs = require('fs')
const _map = require('lodash/map')
const path = require('path')

function _interopDefaultLegacy(e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e } }

const path__default = /* #__PURE__ */_interopDefaultLegacy(path)

const scssBundle = require('scss-bundle')

export default function bundleScss({ output, exclusive = true, bundlerOptions = {} } = {}) {
  const files = {}
  const {
    project = null,
    dedupeGlobs = [],
    includePaths = [],
    ignoreImports = [],
  } = bundlerOptions
  return {
    name: 'bundle-scss',
    transform(source, id) {
      if (/\.scss$/.test(id)) {
        files[id] = source
        if (exclusive) {
          return { code: `export default ${JSON.stringify(source)}` }
        }
      }
      return null
    },
    async generateBundle(opts) {
      const outputPath = path__default.default.resolve(
        opts.file ? path__default.default.dirname(opts.file) : opts.dir,
        output || `${opts.file ? path__default.default.parse(opts.file).name : 'index'}.scss`,
      )
      await fs.promises.mkdir(path__default.default.dirname(outputPath), { recursive: true })
      const entryContent = _map(files, (_, id) => `@import "${id}";`).join('\n')
      await fs.promises.writeFile(outputPath, entryContent)
      const registry = Object.assign({}, ..._map(files, (content, id) => ({ [id]: content })))
      const bundler = new scssBundle.Bundler(registry, project)
      const result = await bundler.bundle(outputPath, dedupeGlobs, includePaths, ignoreImports)
      await fs.promises.writeFile(outputPath, result.bundledContent)
    },
  }
}
