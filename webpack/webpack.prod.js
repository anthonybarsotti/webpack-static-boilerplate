
// Dependencies
const webpack = require('webpack');
const path = require('path');
const generateConfig = require('./webpack.base');

module.exports = generateConfig({
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
  devtool: 'source-map',
});
