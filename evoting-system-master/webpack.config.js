module.exports = {
    // ... other configurations
    module: {
      rules: [
        // ... other rules
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: [
            /node_modules\/web3\/dist\/web3.min.js/,
            /node_modules\/@ethersproject\/.*/,
          ],
        },
      ],
    },
    // ... other configurations
  };