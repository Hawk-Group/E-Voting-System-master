// ResultsPage.jsx
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json'; // make sure this matches your smart contract ABI
import '../styles/ResultPage.css';

const web3 = new Web3('http://localhost:7545'); // Ganache RPC
const contractAddress = '0x291FA8B9A482E00b18959297C2334f8700fd1675'; // Your deployed contract address

const votingContract = new web3.eth.Contract(contractABI, contractAddress);

const ResultsPage = () => {
  const [candidates, setCandidates] = useState([]);

  const fetchResults = async () => {
    try {
      const resultData = await votingContract.methods.getResults().call();
      setCandidates(resultData);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  useEffect(() => {
    fetchResults(); // initial fetch

    const interval = setInterval(() => {
      fetchResults(); // auto-refresh every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="results-container">
      <h1>📊 Live Election Results</h1>
      <div className="results-grid">
        {candidates.map((candidate, index) => (
          <div key={index} className="result-card">
            <h2>{candidate.name}</h2>
            <p><strong>Party:</strong> {candidate.party}</p>
            <p><strong>Constituency:</strong> {candidate.constituency}</p>
            <p className="vote-count">🗳️ Votes: {candidate.voteCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
