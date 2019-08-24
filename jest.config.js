module.exports = {
  testEnvironment: 'node',
  roots: [
    '<rootDir>'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageReporters: [
    'json-summary',
    'text',
    'lcov'
  ]
}
