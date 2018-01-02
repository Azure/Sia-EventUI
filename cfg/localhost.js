const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    new CopyWebpackPlugin([
      {
        from: `${defaultSettings.srcPath}/extensionHooks/manifest.json`,
        transform: function(content, path) {
          let jsonContent = JSON.parse(content.toString())
          console.log(jsonContent)
          console.log(constants.ticketSystems)
          Object.values(constants.ticketSystems).forEach((system) =>{
            jsonContent.content_scripts[0].matches.push(`${system.ticketUriPrefix}*`)
          })
          return Buffer.from(JSON.stringify(jsonContent))
        }
      }
    ], {copyUnmodified: true}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
])

module.exports = config
