
// Dependencies
const webpack = require('webpack');
const path = require('path');
const generateConfig = require('./webpack.base');

module.exports = generateConfig({
  devServer: {
    hot: true,
    stats: {
      colors: true,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
  ],
  devtool: 'eval-source-map',
});
