import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ClipLoader } from 'react-spinners';
import { FaUserCircle } from 'react-icons/fa';
import jsPDF from 'jspdf';
import contractABI from './abi.json';
import '../styles/VotingPage.css';

const web3 = new Web3('http://localhost:7545');
const contractAddress = '0x291FA8B9A482E00b18959297C2334f8700fd1675';
const votingContract = new web3.eth.Contract(contractABI, contractAddress);

const VotingPage = () => {
  const [candidates, setCandidates] = useState([]);
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

  const handleLogout = () => {
    localStorage.clear();
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
    initialize();

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const generateVotingSlip = (candidate, voterEmail, voteTime) => {
    const doc = new jsPDF();

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('BlockVote Voting Confirmation Slip', 20, 25);

    // Line
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('-------------------------------------------------------------------', 20, 30);

    // Voter Info Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Voter Information', 20, 40);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`• Email Address: ${voterEmail}`, 25, 50);
    doc.text(`• Wallet Address: ${account}`, 25, 60);
    doc.text(`• Vote Timestamp: ${voteTime}`, 25, 70);

    // Candidate Info Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Candidate Chosen', 20, 85);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`• Name: ${candidate.name}`, 25, 95);
    doc.text(`• Party: ${candidate.party || 'Independent'}`, 25, 105);

    // Divider
    doc.setFontSize(12);
    doc.text('-------------------------------------------------------------------', 20, 115);

    // Footer Message
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text('Your vote has been securely recorded on the blockchain.', 20, 125);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text('Thank you for participating in the democratic process.', 20, 135);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Note: This slip is a confirmation of voting. Your vote remains confidential.', 20, 145);

    // Footer
    doc.setFontSize(10);
    doc.text('© BlockVote 2025 | www.blockvote.org', 20, 160);

    doc.save('BlockVote-VotingSlip.pdf');
  };

  const handleVote = async () => {
    try {
      if (!selectedCandidateId) {
        alert('Please select a candidate first!');
        return;
      }

      await votingContract.methods.vote(selectedCandidateId).send({ from: account });

      const selectedCandidate = candidates.find(c => c.candidateId === selectedCandidateId);
      const timestamp = new Date().toLocaleString();

      generateVotingSlip(selectedCandidate, email || 'anonymous@blockvote.com', timestamp);

      alert('✅ Vote successful!');
      fetchVotingStatus(account);
      fetchCandidates();
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
              {partyCandidates.map(candidate => (
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

        {selectedCandidateId !== null && !hasVoted && (
          <div className="confirm-vote">
            <button className="confirm-btn" onClick={handleVote}>
              ✅ Confirm Vote
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingPage;
