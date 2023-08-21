/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/appName.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageReporters: ['lcov'],
  verbose: true,
  coverageThreshold: {
    './src/commands/Auth/': {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    }
  }
};

module.exports = config;
