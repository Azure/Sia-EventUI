'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let constants = require('./localhost.const');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-hot-middleware/client?http://127.0.0.1:' + defaultSettings.port,
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.DefinePlugin({
      'BASE_URL': constants.baseUrl,
      'AUTH_REDIRECT_URI': constants.authRedirectUri,
      'RETRIES': constants.retries,
      'RETRY_EXPONENTIAL_BACKOFF_FACTOR': constants.retryExponentialBackoffFactor,
      'RETRY_MIN_TIMEOUT': constants.retryMinTimeoutInMiliseconds,
      'RETRY_MAX_TIMEOUT': constants.retryMaxTimeoutInMiliseconds,
      'TICKET_REFRESH_INTERVAL': constants.ticketRefreshIntervalInSeconds,
      'AAD_INSTANCE': constants.aadInstance,
      'AAD_TENANT': constants.aadTenant,
      'CLIENT_ID': constants.clientId
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;
