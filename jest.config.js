/* eslint-env node */

const glob = require('glob');

const pkgs = glob.sync('./packages/*').map(p => p.replace(/^\./, '<rootDir>'));

module.exports = {
  transform: { '^.+\\.js$': '<rootDir>/jest.transform.config.js' },
  testURL: 'http://localhost/',
  setupTestFrameworkScriptFile: 'jest-extended',
  clearMocks: true,
  roots: pkgs,
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/']
};
