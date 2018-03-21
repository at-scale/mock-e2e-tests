
module.exports = {
    bail: true,
    collectCoverage: false,
    setupTestFrameworkScriptFile: '<rootDir>/__tests__/setup.js',
    testMatch: [
        '<rootDir>/__tests__/e2e/**/*.spec.js'
    ],
    verbose: true
};
