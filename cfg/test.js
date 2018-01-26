const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin')

const baseConfig = require('./base')

const config = Object.assign({}, baseConfig, {
  cache: false,
  output: {
    filename: 'temp/testBundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    fs: 'empty'
  }
})

config.entry.app.push('./test/loadtests.js')

config.plugins.push(new WebpackShellPlugin({
  onBuildExit: 'mocha --colors temp/testBundle.js'
}))

module.exports = config
