var webpackCfg = require('./cfg/test');

// Set node environment to testing
process.env.NODE_ENV = 'test';

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'PhantomJS' ],
    files: [
      'test/loadtests.js',
      {pattern: 'test/**/*Test.js', included: false},
      {pattern: 'test/**/*Helper.js', included: false},
      //{pattern: 'src/**/*.js', included: false},
      //'_karma_webpack_/loadtests.js',
      //'_karma_webpack_/**/*Test.js',
      //'_karma_webpack_/**/*Helper.js',
      //'test/loadtests.processed.js',
      //'test/**/*Test.processed.js',
      //'test/**/*Helper.processed.js'
    ],
    exclude: [
      'src/index.js'
    ],
    port: 8000,
    captureTimeout: 60000,
    frameworks: [ 'mocha', 'chai' ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    preprocessors: {
      '../test/loadtests.js': ['webpack', 'sourcemap'],
      '../test/**/*Test.js': ['webpack', 'sourcemap'],
      '../src/*.js': 'coverage'
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: false
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    }
  });
};
