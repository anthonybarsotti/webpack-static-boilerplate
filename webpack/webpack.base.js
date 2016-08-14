
// Dependencies
const webpack = require('webpack');
const path = require('path');

// Webpack plugins
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Postcss plugins
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');
const postcssDiscardEmpty = require('postcss-discard-empty');
const cssnext = require('postcss-cssnext');

module.exports = function(config) {
  return {
    entry: path.join(process.cwd(), 'client', 'scripts', 'app.js'),
    output: {
      path: path.resolve(process.cwd(), 'build'),
      filename: 'app.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
        },
        {
          test: /\.css$/,
          loader: ExtractTextWebpackPlugin.extract('style', 'css!postcss'),
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: 'file',
          query: {
            name: '/assets/images/[name].[ext]',
          },
        },
      ],
    },
    postcss() {
      return [
        postcssImport({
          glob: true,
          onImport: function (files) {
              files.forEach(this.addDependency);
          }.bind(this),
        }),
        cssnext(),
        postcssReporter({
          clearMessages: true,
        }),
        postcssDiscardEmpty(),
      ];
    },
    plugins: config.plugins.concat([
      new CopyWebpackPlugin([
        {
          from: path.join(process.cwd(), 'client', 'assets'),
          to: 'assets',
        },
      ]),
      new ExtractTextWebpackPlugin('[name].css', {
        allChunks: true,
      }),
      new HtmlWebpackPlugin({
        template: path.join(process.cwd(), 'client', 'index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: false,
        },
      })
    ]),
    resolve: {
      modules: ['app', 'node_modules'],
      extensions: [
        '',
        '.js',
        '.jsx',
      ],
    },
    target: 'web',
    progress: true,
    debug: true,
    devtool: config.devtool,
  };
};
