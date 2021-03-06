const webpack = require('webpack');
const path = require('path');
const CommonOptions = require('./common.js');

const BROWSER_NAME = 'safari';
const BROWSER_MIN_SUPPORTED_VERSION = 10;

module.exports = {
  entry: CommonOptions.EntryPoints,
  output: {
    filename: 'bundle.[name].[chunkhash].js',
    path: path.resolve(__dirname, '..', 'dist', BROWSER_NAME),
    publicPath: `/dist/${BROWSER_NAME}/`,
    chunkFilename: 'bundle.[name].[chunkhash].js'
  },
  stats: CommonOptions.WebpackStats,
  module: {
    rules: [
      CommonOptions.BabelLoaderRule,
      CommonOptions.CSSLoaderRule(`${BROWSER_NAME} ${BROWSER_MIN_SUPPORTED_VERSION}`)
    ]
  },
  plugins: [
    CommonOptions.CleanupPlugin,
    new webpack.DefinePlugin({
      POLYFILL_OBJECT_ASSIGN: false,
      POLYFILL_OBJECT_VALUES: false,
      POLYFILL_PROMISES: false,
      POLYFILL_FETCH: true,
      POLYFILL_URL: false,
      ALLOW_OFFLINE: false,
      BROWSER_EXECUTION: true,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    CommonOptions.BabiliMinification,
    CommonOptions.ExtractCSSPlugin,
  ]
};