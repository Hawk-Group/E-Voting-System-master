import React, { useState, useEffect } from "react";
import loadBlockchain from "../utils/loadBlockchain";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [candidate, setCandidate] = useState({ name: "", party: "", constituency: "" });
  const [voterAddress, setVoterAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const { web3, accounts, contract } = await loadBlockchain();
        setAccount(accounts[0]);
        setContract(contract);
      } catch (err) {
        console.error("Blockchain init error:", err);
        alert("Failed to load blockchain. See console for details.");
      }
    };
    init();
  }, []);

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const { name, party, constituency } = candidate;
    if (!name || !party || !constituency) return alert("Please fill all fields.");

    try {
      setLoading(true);
      await contract.methods
        .addCandidate(name, party, constituency)
        .send({ from: account });

      setMessage(`Candidate ${name} added successfully.`);
      setCandidate({ name: "", party: "", constituency: "" });
    } catch (err) {
      console.error("Error adding candidate:", err);
      alert("Failed to add candidate.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterVoter = async (e) => {
    e.preventDefault();
    if (!voterAddress) return alert("Enter voter address.");

    try {
      setLoading(true);
      await contract.methods.registerVoter(voterAddress).send({ from: account });

      setMessage(`Voter ${voterAddress} registered successfully.`);
      setVoterAddress("");
    } catch (err) {
      console.error("Error registering voter:", err);
      alert("Failed to register voter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Connected Account: <strong>{account}</strong></p>

      {message && <div className="message">{message}</div>}

      <div className="form-section">
        <h2>Add Candidate</h2>
        <form onSubmit={handleAddCandidate}>
          <input
            type="text"
            placeholder="Candidate Name"
            value={candidate.name}
            onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Party"
            value={candidate.party}
            onChange={(e) => setCandidate({ ...candidate, party: e.target.value })}
          />
          <input
            type="text"
            placeholder="Constituency"
            value={candidate.constituency}
            onChange={(e) => setCandidate({ ...candidate, constituency: e.target.value })}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Candidate"}
          </button>
        </form>
      </div>

      <div className="form-section">
        <h2>Register Voter</h2>
        <form onSubmit={handleRegisterVoter}>
          <input
            type="text"
            placeholder="Voter Wallet Address"
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Voter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
