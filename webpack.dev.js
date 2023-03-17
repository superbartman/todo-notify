const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: false,
    devMiddleware: {
      writeToDisk: true,
    },
    port: process.env.PORT || 3000,
  },
});
