const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index')
  ],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_PREFIX: JSON.stringify(process.env.API_PREFIX || ''),
        API_HOST: JSON.stringify(process.env.API_HOST || '')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TsConfigPathsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
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
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              localIdentName: '[name]__[hash:base64:5]',
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.css$/,
        include: /(src\/assets|node_modules)/,
        use: ['style-loader', 'css-loader']
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