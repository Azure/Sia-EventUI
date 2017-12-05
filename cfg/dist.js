'use strict'

let path = require('path')
let webpack = require('webpack')

let baseConfig = require('./base')
let defaultSettings = require('./defaults')
let constants = require('./dist.const');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin')

let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'BASE_URL': constants.baseUrl,
      'AUTH_REDIRECT_URI': constants.authRedirectUri,
      'RETRIES': constants.retries,
      'RETRY_EXPONENTIAL_BACKOFF_FACTOR': constants.retryExponentialBackoffFactor,
      'RETRY_MIN_TIMEOUT': constants.retryMinTimeoutInMiliseconds,
      'RETRY_MAX_TIMEOUT': constants.retryMaxTimeoutInMiliseconds,
      'TICKET_REFRESH_INTERVAL': constants.ticketRefreshIntervalInSeconds,
      'AAD_TENANT': constants.aadTenant,
      'CLIENT_ID': constants.clientId,
      'AUTH_VERSION': constants.authVersion
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new UglifyJSPlugin({
      parallel: {
          cache: true,
          workers: 2
      }
  }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
})

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
})

module.exports = config;
