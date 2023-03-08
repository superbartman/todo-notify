const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const shouldOpenAnalyzer = false;
const ANALYZER_HOST = 'localhost';
const ANALYZER_PORT = '8888';
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    shouldOpenAnalyzer &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT,
      }),
  ].filter(Boolean),
});
