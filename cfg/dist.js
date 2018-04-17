const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')
const siaRoot = path.join(__dirname, '..')

const config = Object.assign({}, baseConfig, {
  mode: 'production',
  cache: false,
  devtool: 'sourcemap',
  optimization: {
    minimizer: [new UglifyJSPlugin({ sourceMap: true })]
  },
  resolve: {
    modules: [
      path.resolve(siaRoot, 'node_modules')
    ],
    alias: {
      src: path.resolve(path.join(siaRoot, 'src')),
      actions: path.resolve(path.join(siaRoot, 'src', 'actions')),
      components: path.resolve(path.join(siaRoot, 'src', 'components')),
      config: path.resolve(path.join(siaRoot, 'src', 'config')),
      containers: path.resolve(path.join(siaRoot, 'src', 'containers')),
      extensionHooks: path.resolve(path.join(siaRoot, 'src', 'extensionHooks')),
      helpers: path.resolve(path.join(siaRoot, 'src', 'helpers')),
      reducers: path.resolve(path.join(siaRoot, 'src', 'reducers')),
      services: path.resolve(path.join(siaRoot, 'src', 'services')),
      static: path.resolve(path.join(siaRoot, 'src', 'static')),
      styles: path.resolve(path.join(siaRoot, 'src', 'styles')),
      configureStore: path.resolve(path.join(siaRoot, 'src', 'configureStore'))
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(path.join(siaRoot, 'node_modules'))
    ]
  }
})

config.entry.app.push(path.join(__dirname, '../src/index'))

config.plugins.push(...[
  new webpack.optimize.AggressiveMergingPlugin()
])

module.exports = config
