const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.REACT_WEBPACK_ENV

let constants
try {
  constants = require(`./${env}.const`)
} catch (ex) {
  if (ex.code && ex.code === 'MODULE_NOT_FOUND') {
    console.log(`${env}.const not found. Falling back to defaultConstants.`)
    constants = require('./defaultConstants')
  } else {
    throw new Error(`Unknown error while loading ${env}.const. ${ex}`)
  }
}

const siaRoot = path.join(__dirname, '..')
const publicPath = '/assets/'

const config = {
  entry: {
    app: ['babel-polyfill'],
    appInsights: path.join(siaRoot, 'src/appInsights')
  },
  devtool: 'eval',
  output: {
    path: path.join(siaRoot, 'dist/assets'),
    filename: '[name].js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: path.join(siaRoot, 'src'),
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
      { from: path.join(siaRoot, 'src/extensionHooks/manifest.json'), to: path.join(siaRoot, 'dist') },
      { from: path.join(siaRoot, 'src/static'), to: path.join(siaRoot, 'dist/static') },
      { from: path.join(siaRoot, 'src/static/favicon.ico'), to: path.join(siaRoot, 'dist') },
      { from: path.join(siaRoot, 'src/extensionHooks/extension.html'), to: path.join(siaRoot, 'dist') },
      { from: path.join(siaRoot, 'src/index.html'), to: path.join(siaRoot, 'dist') }
    ],
    { copyUnmodified: true })
  ]
}

module.exports = config
