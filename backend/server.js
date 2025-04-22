const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Candidate = require('./models/Candidate.js');  // Assuming you have Candidate model

const app = express();
app.use(cors());  // Allow cross-origin requests

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/votingapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected for Voting App');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Endpoint to get candidates
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find();  // Fetch candidates from MongoDB
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching candidates' });
  }
});

// Start the backend server
app.listen(5000, () => {
  console.log('Voting App Backend server is running on http://localhost:5000');
});