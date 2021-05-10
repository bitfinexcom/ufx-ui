module.exports = {
  roots: [
      "<rootDir>/.",
      "<rootDir>/packages",
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.svg": "<rootDir>/tests/__mocks__/svgrMock.js",
    "\\.(css|scss)$": "<rootDir>/tests/__mocks__/styleMock.js",
    "focus-trap-react": "<rootDir>/tests/__mocks__/focus-trap-react.js",
  },
  verbose: true
};
