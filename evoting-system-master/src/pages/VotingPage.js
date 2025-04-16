import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadBlockchain from "../utils/loadBlockchain"; // Make sure this imports correctly
import "../styles/VotingPage.css";
import contractAddress from '../config/contract-address.json';


const VotingPage = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        // Initialize Web3 and the contract instance
        const { web3, accounts, contract } = await loadBlockchain(contractAddress.contractAddress);
        setAccount(accounts[0]);
        setContract(contract);

        // Fetch candidates from the contract
        const count = await contract.methods.candidateCount().call();
        const candidateList = [];

        for (let i = 0; i < count; i++) {
          const c = await contract.methods.candidates(i).call();
          candidateList.push({
            id: c.id,
            name: c.name,
            party: c.party,
            constituency: c.constituency,
            voteCount: c.voteCount,
          });
        }

        setCandidates(candidateList);
        console.log("Loaded Candidates:", candidateList);
      } catch (err) {
        console.error("Error loading blockchain data:", err);
        alert("Error loading blockchain. Check console.");
      }
    };
    init();
  }, []);

  const handleVote = async () => {
    if (!selectedCandidate) {
      alert("Please select a candidate to vote.");
      return;
    }

    try {
      setLoading(true);
      // Send the vote transaction
      await contract.methods.vote(selectedCandidate).send({ from: account });

      // ✅ Redirect to Success Page
      navigate("/success");
    } catch (err) {
      console.error("Voting error:", err);
      alert("Something went wrong while voting. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const groupByParty = () => {
    const groups = {};
    candidates.forEach((c) => {
      if (!groups[c.party]) {
        groups[c.party] = [];
      }
      groups[c.party].push(c);
    });
    return groups;
  };

  const grouped = groupByParty();

  return (
    <div className="voting-container">
      <h1>Voting Instructions</h1>
      <p>
        Select your preferred candidate by clicking on their card, then confirm
        your choice by clicking the “Cast Your Vote” button.
      </p>

      {/* Loop through each party and display candidates */}
      {Object.keys(grouped).map((party) => (
        <div key={party}>
          <h2 style={{ color: party === "BJP" ? "orange" : "blue" }}>{party}</h2>
          <div className="card-grid">
            {grouped[party].map((candidate) => (
              <div
                key={candidate.id}
                className={`card ${selectedCandidate === candidate.id ? "selected" : ""}`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <h3>{candidate.name}</h3>
                <p>{candidate.constituency}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Vote button */}
      <button className="vote-button" onClick={handleVote} disabled={loading}>
        {loading ? "Casting Vote..." : "Cast Your Vote"}
      </button>
    </div>
  );
};

export default VotingPage;
