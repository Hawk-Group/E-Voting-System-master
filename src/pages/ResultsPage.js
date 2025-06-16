import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json';
import '../styles/ResultsPage.css';

const web3 = new Web3('http://localhost:7545');
const contractAddress = '0x291FA8B9A482E00b18959297C2334f8700fd1675';
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates  = async () => {
    const res = await fetch('http://localhost:5000/api/candidates');
    return res.json();
  };

  const fetchBlockchain = async () => {
    const data = await votingContract.methods.getResults().call();
    return data.map(c => ({
      id: parseInt(c.id),
      name: c.name,
      party: c.party,
      voteCount: parseInt(c.voteCount),
    }));
  };

  const merge = (mongoList, chainList) => {
    const merged = chainList.map(cc => {
      const match = mongoList.find(m => parseInt(m.candidateId) === cc.id);
      return { ...cc, image: match?.image || '' };
    });
    setResults(merged);
  };

  useEffect(() => {
    (async () => {
      try {
        const [mongoData, chainData] = await Promise.all([
          fetchCandidates(),
          fetchBlockchain()
        ]);
        merge(mongoData, chainData);
      } catch (err) {
        console.error('Failed to load results:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const byParty = results.reduce((acc, c) => {
    (acc[c.party] = acc[c.party] || []).push(c);
    return acc;
  }, {});

  return (
    <div className="results-page">
      <h1>📊 Election Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        Object.entries(byParty).map(([party, candidates]) => (
          <div key={party}>
            <h2>{party}</h2>
            <div className="results-grid">
              {candidates.map(c => (
                <div key={c.id} className="result-card">
                  {c.image && (
                    <img src={c.image} alt={c.name} className="candidate-image" />
                  )}
                  <h3>{c.name}</h3>
                  <p><strong>Votes:</strong> {c.voteCount}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ResultsPage;
