const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.REACT_WEBPACK_ENV

let constants
try {
  constants = require(`./${env}.const`)
} catch (ex) { // TODO: Catch only file not found.
  console.log(`${env}.const not found.`, ex)
  constants = require('./defaultConstants')
}

const siaRoot = path.join(__dirname, '..')
const publicPath = '/assets/'

const config = {
  entry: {
    app: ['babel-polyfill'],
    ticketHook: path.join(__dirname, '../src/extensionHooks/ticketHook'),
    messager: path.join(__dirname, '../src/extensionHooks/messager')
  },
  devtool: 'eval',
  output: {
    path: path.join(siaRoot, 'dist/assets'),
    filename: '[name].js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(mp4|ogg|svg|eot|ttf)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
      'constants': JSON.stringify(constants)
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de/),
    new CopyWebpackPlugin([
      {
        from: path.join(siaRoot, 'src/extensionHooks/manifest.json'),
        to: path.join(siaRoot, 'dist'),
        transform: function (content, path) {
          let jsonContent = JSON.parse(content.toString())
          Object.values(constants.ticketSystems).forEach((system) => {
            jsonContent.content_scripts[0].matches.push(`${system.ticketUriPrefix}*`)
          })
          return Buffer.from(JSON.stringify(jsonContent))
        }
      },
      { from: path.join(siaRoot, 'src/extensionHooks/extension.html'), to: path.join(siaRoot, 'dist') },
      { from: path.join(siaRoot, 'src/index.html'), to: path.join(siaRoot, 'dist') }
    ],
    { copyUnmodified: true })
  ]
}

module.exports = config
