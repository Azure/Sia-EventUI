const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')

const config = Object.assign({}, baseConfig, {
  cache: true,
  devtool: 'eval-source-map'
})

config.entry.push(...[
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
  path.join(__dirname, '../src/index')
])

config.plugins.push(...[
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
