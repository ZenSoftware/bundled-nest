const esModules = ['lodash-es'].join('|');

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  transform: {
    [`(${esModules}).+\\.js$`]: 'babel-jest',
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  coverageDirectory: '../coverage',
  coverageReporters: ['html'],
  testEnvironment: 'node',
};
