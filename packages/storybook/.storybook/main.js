import { dirname, join } from "path";
export default {
  stories: [
    './stories/*.stories.mdx',
    '../../core/src/components/**/**/*.stories.js',
    '../../bfx-containers/src/containers/**/**/*.stories.js',
  ],

  addons: [
    getAbsolutePath("@storybook/preset-scss"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-styling")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {}
  },

  docs: {
    autodocs: true
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
