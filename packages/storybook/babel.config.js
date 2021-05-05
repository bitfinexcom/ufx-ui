const base = require('../../babel.config.base.js')

module.exports = {
  ...base,
  plugins: [
    ['@babel/plugin-proposal-class-properties', { "loose": true }],
    ['@babel/plugin-proposal-private-methods', { "loose": true }],
    ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
  ],
}
