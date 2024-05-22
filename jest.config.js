module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    './jest.setup.js',
  ],
  transformIgnorePatterns: ['node_modules/?!(@sentry/types)'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
};
