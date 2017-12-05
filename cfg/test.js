'use strict'

let webpack = require('webpack')
let nodeExternals = require('webpack-node-externals')
let WebpackShellPlugin = require('webpack-shell-plugin')
let baseConfig = require('./base')
let defaultSettings = require('./defaults')
let constants = require('./test.const')

let testStandinFor = (variableName) => 'Test Standin For ' + variableName

let config = Object.assign({}, baseConfig, {
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
    new webpack.DefinePlugin(Object.assign(
      {},
      constants,
      {
          authVersion: "'TEST'"
      }
  ))
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
})

module.exports = config
