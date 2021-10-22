/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src') + '/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  devtool: 'source-map',
  target: 'web',
  resolve: {
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
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },

      {
        test: /\.(scss|css)$/,
        use: [
          MiniCSSExtractPlugin.loader,
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets'),
          to: 'assests',
        },
      ],
    }),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js', 'jsx'],
      exclude: 'node_modules',
    }),
    new MiniCSSExtractPlugin({
      filename: 'dist/[name].css',
      chunkFilename: '[name].css',
    }),
  ],
};
