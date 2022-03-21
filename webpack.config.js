
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: './scripts/game.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{
        from: 'template',
        to: './',
      }],
    }),
  ],

  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  devServer: {
    hot: true,
  },
};
