import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import '../styles/VotingPage.css';
import ConnectWallet from './ConnectWallet';

const contractABI = [
  {
    "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_voter", "type": "address" }],
    "name": "registerVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_candidateId", "type": "uint256" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "candidates",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "candidatesCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCandidates",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
        ],
        "internalType": "struct Evoting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getResults",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "uint256", "name": "voteCount", "type": "uint256" }
        ],
        "internalType": "struct Evoting.Candidate[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalVotes",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "voters",
    "outputs": [
      { "internalType": "bool", "name": "registered", "type": "bool" },
      { "internalType": "bool", "name": "voted", "type": "bool" },
      { "internalType": "address", "name": "delegate", "type": "address" },
      { "internalType": "uint256", "name": "vote", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

const parties = [
  {
    name: 'Bharatiya Janata Party (BJP)',
    color: '#f39c12',
    candidates: [
      { id: 0, name: 'Narendra Modi', constituency: 'Varanasi' },
      { id: 1, name: 'Amit Shah', constituency: 'Gandhinagar' },
      { id: 2, name: 'Rajnath Singh', constituency: 'Lucknow' }
    ]
  },
  {
    name: 'Indian National Congress',
    color: '#2980b9',
    candidates: [
      { id: 3, name: 'Rahul Gandhi', constituency: 'Wayanad' },
      { id: 4, name: 'Priyanka Gandhi', constituency: 'Lucknow' },
      { id: 5, name: 'Mallikarjun Kharge', constituency: 'Kalaburagi' }
    ]
  }
];

function VotingPage() {
  const [wallet, setWallet] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (wallet) {
      const _web3 = new Web3(window.ethereum);
      const _contract = new _web3.eth.Contract(contractABI, contractAddress);
      setWeb3(_web3);
      setContract(_contract);
    }
  }, [wallet]);

  const handleVote = async () => {
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!selectedCandidate) {
      alert("Please select a candidate.");
      return;
    }

    try {
      await contract.methods.vote(selectedCandidate.id).send({ from: wallet });
      alert(`Your vote for ${selectedCandidate.name} has been recorded on the blockchain.`);
    } catch (error) {
      console.error("Voting error:", error);
      alert("There was an error while voting. Check the console for details.");
    }
  };

  return (
    <div>
      <ConnectWallet setWallet={setWallet} />
      <div className="container">
        <h2>Voting Instructions</h2>
        <p className="instructions">
          Select your preferred candidate by clicking on their card, then confirm your choice by clicking the “Cast Your Vote” button below.
        </p>

        {parties.map((party, index) => (
          <div className="party" key={index}>
            <h3 style={{ color: party.color }}>{party.name}</h3>
            <div className="candidates">
              {party.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={`card ${selectedCandidate?.id === candidate.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <h4>{candidate.name}</h4>
                  <p>{candidate.constituency}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="button-container">
          <button className="vote-button" onClick={handleVote}>
            Cast Your Vote
          </button>
        </div>
      </div>
    </div>
  );
}

export default VotingPage;
