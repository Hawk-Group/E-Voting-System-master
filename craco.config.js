// Import webpack at the top of the file
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add polyfills for node core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        assert: require.resolve('assert/'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
      };

      // Add source-map-loader for better debugging
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/web3\/dist\/web3.min.js/,
          /node_modules\/@ethersproject\/.*/,
        ],
      });

      // Add the Buffer polyfill to the global scope
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );

      return webpackConfig;
    },
  },
};
