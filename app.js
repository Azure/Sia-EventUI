const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');
const app = express();

const compiler = webpack(webpackConfig);
if (process.env.NODE_ENV != 'dist') {
    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'app.js',
        publicPath: '/assets/',
        stats: {
            colors: true,
        },
        historyApiFallback: true,
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname + '/src/index.html'));
    });
} else {
    const DIST_DIR = path.join(__dirname, 'dist'),
        HTML_FILE = path.join(DIST_DIR, 'index.html');

    app.use(express.static(DIST_DIR));
    app.get('*', function (req, res) {
        res.sendFile(HTML_FILE);
    });
}

module.exports = app;