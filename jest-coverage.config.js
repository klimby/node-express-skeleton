process.env.NODE_ENV = 'testing';
process.env.npm_package_version = '1.0.0';
process.env.npm_package_name = 'express-skeleton';
process.env.HOSTNAME = 'node-server';
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
