const express = require('express')
const path = require('path')
const app = express()

if (process.env.NODE_ENV !== 'dist') {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('./webpack.config')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'app.js',
    publicPath: '/assets/',
    stats: {
      colors: true
    },
    historyApiFallback: true
  }))

  app.use('/favicon.ico', express.static(path.join(__dirname, 'src/static/favicon.ico')))

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '/src/index.html'))
  })
} else {
  const DIST_DIR = path.join(__dirname, 'dist')
  const HTML_FILE = path.join(DIST_DIR, 'index.html')

  app.use(express.static(DIST_DIR))
  app.get('*', function (req, res) {
    res.sendFile(HTML_FILE)
  })
}

module.exports = app
