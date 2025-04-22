const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const contractABI = require('../abi.json'); // replace with your actual ABI path

// Setup Web3 and Contract
const web3 = new Web3('http://127.0.0.1:7545'); // Ganache RPC or testnet URL
const contractAddress = '0x291FA8B9A482E00b18959297C2334f8700fd1675'; // Replace with your contract address
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

// Your private key (store securely in .env in real projects)
const PRIVATE_KEY = '0x0024e53ac0e6cc1e8edabb389e78c68e3bbe68302123812dcbe360cadb86fef4'; // ⚠ Replace with actual private key from Ganache

// Route to cast a vote
router.post('/', async (req, res) => {
  try {
    const { candidateId } = req.body;

    if (typeof candidateId !== 'number') {
      return res.status(400).json({ error: 'Invalid candidateId' });
    }

    // Get account from private key
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const fromAddress = account.address;

    // Encode transaction data
    const data = votingContract.methods.vote(candidateId).encodeABI();

    // Get current nonce
    const nonce = await web3.eth.getTransactionCount(fromAddress);

    // Create the transaction object
    const tx = {
      to: contractAddress,
      data,
      gas: 200000,
      nonce,
      chainId: await web3.eth.getChainId()
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    // Send the transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('✅ Vote cast. Tx hash:', receipt.transactionHash);
    res.json({ message: 'Vote successful', txHash: receipt.transactionHash });

  } catch (error) {
    console.error('❌ Error casting vote:', error);
    res.status(500).json({ error: 'Failed to cast vote' });
  }
});

module.exports = router;