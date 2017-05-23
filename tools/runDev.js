const webpack = require('webpack')
const browserSync = require('browser-sync')
const historyApiFallback = require('connect-history-api-fallback')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.js')

const bundler = webpack(config)

browserSync({
  port: 3000,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'src',

    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        noInfo: false,
        quiet: false,
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: false,
          chunks: false,
          chunkModules: false
        }
      }),
      webpackHotMiddleware(bundler, {
        reload: true
      })
    ]
  },
  files: [
    'src/*.html'
  ]
})
