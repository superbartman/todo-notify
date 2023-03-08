const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks: ['index'],
    }),
  ],
  devServer: {
    static: false,
    devMiddleware: {
      writeToDisk: true,
    },
    port: process.env.PORT || 3000,
  },
});
