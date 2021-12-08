/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      // Here you should add some aliases for importing files from folders
      // example:
      // assets: path.resolve(__dirname, '../src/assets'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js', 'jsx'],
      exclude: 'node_modules',
    }),
  ],
});
