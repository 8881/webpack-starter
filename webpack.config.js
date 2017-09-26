const webpack = require('webpack');
const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostCssNext = require('postcss-cssnext');
const PostCssImport = require('postcss-import');
const precss = require('precss');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '',
    crossOriginLoading: "anonymous",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ["env"],
        },
      },
      {
        test: /\.[p]?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [PostCssNext, precss, PostCssImport],
              },
            }
          ],
          allChunks: true,
        }),
      },
    ],
  },
  target: 'web',
  stats: 'errors-only',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true,
    noInfo: false,
    open: true,
    openPage: 'index.html',
  },
  cache: false,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new htmlPlugin({
      template: './src/index.html',
    }),
  ]
};
