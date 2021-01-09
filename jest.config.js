module.exports = {
  verbose: true,
  collectCoverage: true,
  testEnvironment: 'node',
  collectCoverageFrom: [
    '*.{js,jsx}',
    '!index.js',
    '!cmd-app.js',
    '!prompt.js',
    '!constants.js',
    '!jest.config.js'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/mock-objects']
};
