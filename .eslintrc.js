const pkg = require('./package.json')

module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb"],
  "plugins": ["react-hooks"],
  "rules": {
    "arrow-parens": "off",
    "import/no-named-as-default": "warn",
    "jsx-quotes": ["error", "prefer-single"],
    "react/jsx-filename-extension": [
      2,
      {
        "extensions": [".js"]
      }
    ],
    "semi": [2, "never"],
    "no-restricted-imports": [
      2,
      {
        "patterns": ["*.css"],
        "paths": ["lodash"]
      }
    ],
    "max-len": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-nested-ternary": 0,
    "react/prop-types": 0,
    "react/prefer-stateless-function": 0,
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", ["parent", "sibling"]],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          }
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "import/no-unresolved": ["error", { ignore: Object.keys(pkg.peerDependencies) }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": ["node_modules", "src"]
      }
    },
    "react": {
      "version": "16.13.1"
    }
  },
  "env": {
    "browser": true,
    "jest": true
  }
}
