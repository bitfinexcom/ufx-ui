const peerDependencies = {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.2"
}

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['react-hooks'],
  rules: {
    'arrow-parens': 'off',
    'import/no-named-as-default': 'warn',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js'],
      },
    ],
    semi: ['error', 'never'],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['*.css'],
        paths: ['lodash'],
      },
    ],
    'max-len': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-nested-ternary': 'off',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'import/no-unresolved': ['error', { ignore: Object.keys(peerDependencies) }],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
    react: {
      version: '16.13.1',
    },
  },
  env: {
    browser: true,
    jest: true,
  },
}
