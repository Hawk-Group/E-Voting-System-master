import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    image: '',
    candidateId: ''
  });

  const fetchCandidates = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/candidates');
      const data = await res.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddCandidate = async () => {
    const { name, party, image, candidateId } = formData;
    if (!name || !party || !image || !candidateId) {
      alert('Please fill all fields!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          party,
          image,
          candidateId: parseInt(candidateId)
        })
      });

      if (res.ok) {
        alert('✅ Candidate added!');
        setFormData({ name: '', party: '', image: '', candidateId: '' });
        fetchCandidates();
      } else {
        const err = await res.json();
        alert('❌ Failed to add candidate: ' + err.error);
      }
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleDeleteCandidate = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/candidates/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('🗑 Candidate deleted!');
        fetchCandidates();
      } else {
        alert('❌ Failed to delete candidate.');
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛠 Admin Panel</h1>

      <h2>Add Candidate</h2>
      <div style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
        <input type="text" name="party" placeholder="Party" value={formData.party} onChange={handleInputChange} />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} />
        <input type="number" name="candidateId" placeholder="Candidate ID" value={formData.candidateId} onChange={handleInputChange} />
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>

      <h2 style={{ marginTop: '30px' }}>Existing Candidates</h2>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id} style={{ marginBottom: '10px' }}>
            {candidate.name} ({candidate.party}) - <button onClick={() => handleDeleteCandidate(candidate._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
