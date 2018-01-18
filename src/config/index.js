let config
try {
  // The global 'constants' is being defined by Webpack in /cfg/[dev|dist|test|localhost].js
  // eslint-disable-next-line no-undef
  config = constants
} catch (ex) { // required for Travis and Code Coverage
  try {
    const testConstants = require('../../cfg/test.const.js')
    config = testConstants.default || testConstants
  } catch (ex) {
    const defaultConstants = require('../../cfg/defaultConstants')
    config = defaultConstants.default || defaultConstants
  }
}

export default config
