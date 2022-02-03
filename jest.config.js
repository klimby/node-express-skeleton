process.env.NODE_ENV = 'testing';
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts'
  ],
  coverageDirectory: '<rootDir>/test/coverage',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  preset: 'ts-jest',
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
};
