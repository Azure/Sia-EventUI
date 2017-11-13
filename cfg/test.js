'use strict'

var webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')
var WebpackShellPlugin = require('webpack-shell-plugin')
let defaultSettings = require('./defaults')
let constants = require('./defaultConstants')

var testStandinFor = (variableName) => 'Test Standin For ' + variableName

var config = {
  entry: './test/loadtests.js',
  output: {
    filename: 'temp/testBundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
          {
            test: /\.js$/,
            enforce: 'pre',

            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      loaders: [
        {
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015']
          }
        }
      ]
  },

  plugins: [
    new WebpackShellPlugin({
      onBuildExit: "mocha temp/testBundle.js"
    }),
    new webpack.DefinePlugin({
      'BASE_URL': constants.baseUrl,
      'AUTH_REDIRECT_URI': constants.authRedirectUri,
      'RETRIES': constants.retries,
      'RETRY_EXPONENTIAL_BACKOFF_FACTOR': constants.retryExponentialBackoffFactor,
      'RETRY_MIN_TIMEOUT': constants.retryMinTimeoutInMiliseconds,
      'RETRY_MAX_TIMEOUT': constants.retryMaxTimeoutInMiliseconds,
      'TICKET_REFRESH_INTERVAL': constants.ticketRefreshIntervalInSeconds,
      'AAD_TENANT': constants.aadTenant,
      'CLIENT_ID': constants.clientId
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + (process.env.REACT_WEBPACK_ENV ? process.env.REACT_WEBPACK_ENV : 'test'),
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
}

module.exports = config
