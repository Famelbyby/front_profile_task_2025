/** @type {import("jest").Config} **/
export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    preset: 'ts-jest',
    moduleNameMapper: {
        '\\.(s)(css)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: ['src/**'],
    coverageThreshold: {
        global: {
            branches: 40,
            functions: 30,
            lines: 40,
        },
    },
    coverageReporters: ['text', 'html'],
};
