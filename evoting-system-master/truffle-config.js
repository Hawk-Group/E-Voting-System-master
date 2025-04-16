module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Ganache GUI default port
      network_id: "*",       // Match any network id
    },
  },

  // Other config like compilers, etc...
  compilers: {
    solc: {
      version: "0.8.0", // Replace with your contract version
    }
  }
};
