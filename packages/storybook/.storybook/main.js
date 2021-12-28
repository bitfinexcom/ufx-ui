module.exports = {
  stories: [
    './stories/*.stories.mdx',
    '../../core/src/components/**/**/*.stories.js',
    '../../bfx-containers/src/containers/**/**/*.stories.js',
  ],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-essentials',
  ],
};
