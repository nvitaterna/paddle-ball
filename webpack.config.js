const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

let mode;

if (process.env.NODE_ENV) {
  mode = process.env.NODE_ENV;
}

const config = {
  mode,
  entry: './src/index.ts',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['babel-loader', 'ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],

      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 244000,
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: './src/index.html',
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, 'dist'),
    }),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map';
  delete config.optimization;
}

module.exports = config;
