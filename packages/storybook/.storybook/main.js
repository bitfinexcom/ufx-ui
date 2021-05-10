module.exports = {
  stories: [
    './stories/*.stories.mdx',
    '../../core/src/components/ui/**/*.stories.js',
    '../../core/src/components/Book/**/*.stories.js',
    '../../bfx-containers/src/containers/Book/**/*.stories.js',
    '../../core/src/components/OrderHistory/**/*.stories.js',
    '../../bfx-containers/src/containers/OrderHistory/**/*.stories.js',
    '../../core/src/components/Trades/**/*.stories.js',
    '../../bfx-containers/src/containers/Trades/**/*.stories.js',
  ],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-essentials',
  ],
};
