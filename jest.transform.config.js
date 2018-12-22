/* eslint-env node */

const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    '@babel/preset-flow',
    '@babel/preset-env'
  ]
});
