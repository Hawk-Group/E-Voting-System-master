import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ClipLoader } from 'react-spinners';
import { FaUserCircle } from 'react-icons/fa';
import contractABI from './abi.json';
import '../styles/VotingPage.css';

const web3 = new Web3('http://localhost:7545');
const contractAddress = '0x291FA8B9A482E00b18959297C2334f8700fd1675';
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

const VotingPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const fetchCandidates = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/candidates')
      .then(res => res.json())
      .then(data => {
        setCandidates(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchVotingStatus = async (userAccount) => {
    try {
      const voted = await votingContract.methods.hasVoted(userAccount).call();
      setHasVoted(voted);
    } catch (error) {
      console.error('Error checking voting status:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const resultsData = await votingContract.methods.getResults().call();
      setResults(resultsData);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleLogout = () => {
    setEmail('');
    setAccount('');
    window.location.href = '/';
  };

  const groupByParty = (data) => {
    return data.reduce((acc, candidate) => {
      const party = candidate.party || 'Independent';
      if (!acc[party]) acc[party] = [];
      acc[party].push(candidate);
      return acc;
    }, {});
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        fetchVotingStatus(accounts[0]);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };

    fetchCandidates();
    fetchResults();
    initialize();

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const interval = setInterval(() => {
      fetchResults(); // auto-refresh live results
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVote = async () => {
    try {
      if (!selectedCandidateId) {
        alert('Please select a candidate first!');
        return;
      }
      await votingContract.methods.vote(selectedCandidateId).send({ from: account });
      alert('✅ Vote successful!');
      fetchVotingStatus(account);
      fetchCandidates();
      fetchResults();
    } catch (error) {
      console.error('Voting error:', error);
      alert('❌ Vote failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader size={60} color="#123abc" loading={loading} />
        <p>Loading candidates...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error loading candidates: {error}</div>;
  }

  return (
    <div className="voting-page">
      <div className="top-bar">
        <FaUserCircle
          className="profile-icon"
          size={30}
          title="Profile"
          onClick={() => setShowDashboard(!showDashboard)}
        />
      </div>

      {showDashboard && (
        <div className="dashboard">
          <h2>👤 Profile</h2>
          <p><strong>Email:</strong> {email || 'Guest'}</p>
          <p><strong>Wallet:</strong> {account}</p>
          <p><strong>Voting Status:</strong> {hasVoted ? '✅ Voted' : '❌ Not Voted Yet'}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}

      <div className="main-content">
        <h1 className="title">🗳 Vote for Your Candidate</h1>

        {/* Candidate Sections Grouped by Party */}
        {Object.entries(groupByParty(candidates)).map(([party, partyCandidates]) => (
          <div key={party}>
            <h2 className="party-title">{party}</h2>
            <div className="candidates-grid">
              {partyCandidates.map((candidate) => (
                <div
                  key={candidate._id}
                  className={`candidate-card ${selectedCandidateId === candidate.candidateId ? 'selected' : ''}`}
                >
                  <img src={candidate.image} alt={candidate.name} className="candidate-image" />
                  <h3>{candidate.name}</h3>
                  <p>{candidate.party}</p>
                  <button
                    className="select-btn"
                    onClick={() => setSelectedCandidateId(candidate.candidateId)}
                  >
                    {selectedCandidateId === candidate.candidateId ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {selectedCandidateId !== null && (
          <div className="confirm-vote">
            <button className="confirm-btn" onClick={handleVote}>
              ✅ Confirm Vote
            </button>
          </div>
        )}

        {/* Live Results */}
        <h2 className="title">📊 Live Election Results</h2>
        {Object.entries(groupByParty(results)).map(([party, partyCandidates]) => (
          <div key={party}>
            <h2 className="party-title">{party}</h2>
            <div className="candidates-grid">
              {partyCandidates.map((candidate) => (
                <div key={candidate.id} className="candidate-card">
                  <h3>{candidate.name}</h3>
                  <p>{candidate.party}</p>
                  <p><strong>Votes:</strong> {parseInt(candidate.voteCount)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingPage;
