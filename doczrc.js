// eslint-disable-next-line import/no-extraneous-dependencies
import { createPlugin } from 'docz-core'
import express from 'express'

const devServerPlugin = () => createPlugin({
  onCreateDevServer: ({ app }) => {
    // makes the chart iframe able to load html file in dev mode
    app.use(express.static('public'))
  },
})

export default {
  title: 'Microfinex UI',
  menu: [
    'Getting Started',
    {
      name: 'Components',
      menu: ['QuickSwap', 'MarketList'],
    },
    {
      name: 'Containers',
    },
  ],
  ignore: ['example/README.md', 'TODO.md', 'changelog.md', 'code_of_conduct.md', 'contributing.md', 'license.md', '**/**/readme.md'],
  dest: 'docz-build',
  plugins: [devServerPlugin()],
}
