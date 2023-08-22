/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    },
    './src/commands/Auth/': {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    },
    './src/commands/Build/': {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    },
    './src/commands/Deploy/': {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    },
    './src/commands/Dev/': {
      statements: 75,
      branches: 85,
      functions: 75,
      lines: 75
    },
    './src/commands/Initialize/': {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    },
    './src/commands/Lint/': {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85
    }
  }
};

module.exports = config;
