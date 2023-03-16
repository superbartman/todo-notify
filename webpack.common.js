const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
    background: './src/background.ts',
    vendor: ['react', 'react-dom', 'antd'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      name: 'ReactChromeExtensions',
      type: 'umd',
      umdNamedDefine: true,
    },
    clean: {
      keep(asset) {
        return (
          asset.includes('manifest.json') ||
          asset.includes('index.html') ||
          asset.includes('icon.png')
        );
      },
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
    extensions: ['.tsx', '.ts', '.js', '.json', 'png'],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks: ['index'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
    ],
  },
};
