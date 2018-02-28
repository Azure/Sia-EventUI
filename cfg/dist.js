const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')

const config = Object.assign({}, baseConfig, {
  cache: false,
  devtool: 'sourcemap'
})

config.entry.app.push(path.join(__dirname, '../src/index'))

config.plugins.push(...[
  //new UglifyJSPlugin({ sourceMap: true }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
