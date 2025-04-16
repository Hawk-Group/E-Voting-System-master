import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import '../styles/ResultPage.css';
// 🔁 Paste your contract ABI here
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

// 🔁 Paste your deployed contract address here
const contractAddress = '0x20DEF683fA73347ea3E434605F5427BE1BFF096b';

const ResultsPage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        try {
          const result = await contract.methods.getResults().call();
          setCandidates(result);
        } catch (error) {
          console.error('Error fetching results:', error);
        }
      }
    };

    fetchResults();

    // Optional: auto-refresh every 5 seconds
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Live Election Results</h1>

        <table className="w-full table-auto border-collapse rounded-xl overflow-hidden shadow">
          <thead>
            <tr className="bg-indigo-100 text-indigo-800 text-lg">
              <th className="py-3 px-4 text-left">Candidate Name</th>
              <th className="py-3 px-4 text-left">Vote Count</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="hover:bg-indigo-50 transition">
                <td className="py-3 px-4 text-gray-800 font-medium">{candidate.name}</td>
                <td className="py-3 px-4 text-gray-600">{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {candidates.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No results available yet.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
