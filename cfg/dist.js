const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base')

const config = Object.assign({}, baseConfig, {
  cache: false,
  devtool: 'sourcemap',
  resolve: {
    modules: [
      path.resolve(__dirname, '..', 'node_modules')
    ],
    alias: {
      src: path.resolve(path.join(__dirname, '..', 'src')),
      actions: path.resolve(path.join(__dirname, '..', 'src', 'actions')),
      components: path.resolve(path.join(__dirname, '..', 'src', 'components')),
      config: path.resolve(path.join(__dirname, '..', 'src', 'config')),
      containers: path.resolve(path.join(__dirname, '..', 'src', 'containers')),
      extensionHooks: path.resolve(path.join(__dirname, '..', 'src', 'extensionHooks')),
      helpers: path.resolve(path.join(__dirname, '..', 'src', 'helpers')),
      reducers: path.resolve(path.join(__dirname, '..', 'src', 'reducers')),
      services: path.resolve(path.join(__dirname, '..', 'src', 'services')),
      static: path.resolve(path.join(__dirname, '..', 'src', 'static')),
      styles: path.resolve(path.join(__dirname, '..', 'src', 'styles')),
      configureStore: path.resolve(path.join(__dirname, '..', 'src', 'configureStore'))
    }
  },
  resolveLoader: {
    modules: [
      path.resolve(path.join(__dirname, '..', 'node_modules'))
    ]
  }
})

config.entry.app.push(path.join(__dirname, '../src/index'))

config.plugins.push(...[
  // new UglifyJSPlugin({ sourceMap: true }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
