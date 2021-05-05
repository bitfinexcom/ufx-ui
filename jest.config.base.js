module.exports = {
  roots: [
      "<rootDir>/.",
      "<rootDir>/packages",
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  moduleNameMapper: {
    "\\.svg": "<rootDir>/tests/__mocks__/svgrMock.js",
    "\\.(css|scss)$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
  verbose: true
};
