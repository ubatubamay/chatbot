'use strict';

const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval',
  entry: `${__dirname}/src/main.js`,
  output: {
    filename: 'bundle-[hash].js',
    path: `${__dirname}/build`,
    publicPath: '/',
  },
  target: 'web',
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    compress: false,
    port: 3000,
    hot: true
  },
  plugins: [
    new HTMLPlugin(),
    new ExtractPlugin('bundle-[hash].css'),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: 'url-loader'
      }
    ],
  },
};