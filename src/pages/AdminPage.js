import React, { useEffect, useState } from 'react';
import '../styles/AdminPage.css'; // Import the CSS file

const AdminPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    party: '',
    image: '',
    candidateId: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchCandidates = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/candidates');
      const data = await res.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      showMessage('Failed to fetch candidates', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddCandidate = async () => {
    const { name, party, image, candidateId } = formData;
    if (!name || !party || !image || !candidateId) {
      showMessage('Please fill all fields!', 'error');
      return;
    }

    setLoading(true);
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
        showMessage('Candidate added successfully!', 'success');
        setFormData({ name: '', party: '', image: '', candidateId: '' });
        fetchCandidates();
      } else {
        const err = await res.json();
        showMessage('Failed to add candidate: ' + err.error, 'error');
      }
    } catch (error) {
      console.error('Error adding candidate:', error);
      showMessage('Error adding candidate', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCandidate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/candidates/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        showMessage('Candidate deleted successfully!', 'success');
        fetchCandidates();
      } else {
        showMessage('Failed to delete candidate', 'error');
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
      showMessage('Error deleting candidate', 'error');
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Panel</h1>
        <p className="admin-subtitle">Manage election candidates</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-content">
        <div className="add-candidate-section">
          <h2 className="section-title">Add New Candidate</h2>
          <div className="form-container">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Candidate Name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="party"
                placeholder="Political Party"
                value={formData.party}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                name="candidateId"
                placeholder="Candidate ID"
                value={formData.candidateId}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <button
              onClick={handleAddCandidate}
              className="add-btn"
              disabled={loading}
            >
              {loading ? <span className="loading"></span> : 'Add Candidate'}
            </button>
          </div>
        </div>

        <div className="candidates-section">
          <h2 className="section-title">Existing Candidates</h2>
          {candidates.length === 0 ? (
            <div className="empty-state">
              <p>No candidates added yet</p>
            </div>
          ) : (
            <ul className="candidates-list">
              {candidates.map(candidate => (
                <li key={candidate._id} className="candidate-item">
                  <div className="candidate-info">
                    <div className="candidate-name">{candidate.name}</div>
                    <div className="candidate-party">{candidate.party}</div>
                  </div>
                  <button
                    onClick={() => handleDeleteCandidate(candidate._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
