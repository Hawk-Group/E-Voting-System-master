const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Candidate = require('./models/Candidate.js');

const app = express();

// Middleware to allow JSON request bodies
app.use(cors());
app.use(express.json()); // ← ADD THIS to parse incoming JSON

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/votingapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected for Voting App');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// ✅ GET all candidates
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching candidates' });
  }
});

// ✅ POST new candidate
app.post('/api/candidates', async (req, res) => {
  const { name, party, image, candidateId } = req.body;

  if (!name || !party || !image || candidateId === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newCandidate = new Candidate({ name, party, image, candidateId });
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    console.error('Error saving candidate:', err);
    res.status(500).json({ error: 'Failed to save candidate' });
  }
});

// ✅ DELETE a candidate by MongoDB _id
app.delete('/api/candidates/:id', async (req, res) => {
  try {
    const deleted = await Candidate.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting candidate' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Voting App Backend running at http://localhost:5000');
});
