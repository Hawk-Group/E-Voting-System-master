const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();  // Ensure .env is loaded

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(
        {
          mnemonic: process.env.MNEMONIC,         // 12-word mnemonic
          providerOrUrl: process.env.INFURA_URL   // Infura URL (Rinkeby/Seplolia)
        }
      ),
      network_id: 11155111,                      // Sepolia network ID
      gas: 3000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    // You can add more networks here if necessary
  },
  compilers: {
    solc: {
      version: "0.8.21",  // Use the version compatible with your contract
    }
  }
};
