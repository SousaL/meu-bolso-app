module.exports = {
    testEnvironment: 'node',
    testEnvironmentOptions: {
        NODE_ENV: 'test',
    },
    restoreMocks: true,
    converagePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests'],
    coverateReports: ['text', 'Icov','clover','html'],
}