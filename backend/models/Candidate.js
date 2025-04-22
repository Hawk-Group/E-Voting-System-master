const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: { type: Number, required: true },
  name: { type: String, required: true },
  party: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Candidate', candidateSchema);