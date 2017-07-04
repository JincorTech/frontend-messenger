const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index')
  ],
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve('dist'),
    publicPath: '/msg/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  plugins: [
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({ 
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_PREFIX: JSON.stringify(process.env.API_PREFIX || ''),
        API_HOST: JSON.stringify(process.env.API_HOST || '')
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new TsConfigPathsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { 
          emitErrors: false,
          failOnHint: false,
          typeCheck: true
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: false,
          useTranspileModule: true
        }
      },
      {
        test: /\.css$/,
        include: /src/,
        exclude: /src\/assets/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { 
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                localIdentName: '[local]___[hash:base64:5]',
              }
            },
            { loader: 'postcss-loader' }
          ]
        })
      },
      {
        test: /\.css$/,
        include: /(src\/assets|node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test:   /\.(ttf|otf|eot|svg|woff2?)(\?.+)?$/,
        loader: 'url-loader',
        options:  {
          limit: 10000
        }
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
    ]
  }
}