module.exports = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "src",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../reports/coverage",
    collectCoverageFrom: [
        "**/*.(t|j)s",
        "!**/dto/**",
        "!**/main.ts",       
        "!**app.module.ts",
        "!**/config/**",
        "!**/constants.ts",
        "!**/*.module.ts",
        "!**/*.decorator.ts",
        "!**/*.guard.ts",
      ],
    testEnvironment: "node",
    reporters: [
        "default",
        ["jest-junit", { outputDirectory: "reports/junit" }]        
    ],
    testResultsProcessor: "jest-sonar-reporter",
    collectCoverage: true,
    coverageReporters: ["lcov", "text", "text-summary"],
    setupFilesAfterEnv: ['../test/jest.setup.js'],
  };