module.exports = {
  stories: [
    './stories/*.stories.mdx',
    '../src/components/format/**/*.stories.js',
    '../src/components/ui/**/*.stories.js',
    '../src/components/Book/**/*.stories.js',
    '../src/containers/Book/**/*.stories.js',
    '../src/components/OrderHistory/**/*.stories.js',
    '../src/containers/OrderHistory/**/*.stories.js',
    '../src/components/Trades/**/*.stories.js',
    '../src/containers/Trades/**/*.stories.js'
  ],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-essentials',
  ],
};
