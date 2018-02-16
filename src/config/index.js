let config

if (typeof constants !== 'undefined') {
  // The global 'constants' is being defined by Webpack in /cfg/[dev|dist|test|localhost].js
  // eslint-disable-next-line no-undef
  config = constants
} else {
  const defaultConstants = require('../../cfg/defaultConstants')
  config = defaultConstants.default || defaultConstants
}

export default config
