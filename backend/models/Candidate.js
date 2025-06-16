const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  party: { type: String, required: true },
  image: { type: String, required: true },
  votes: { type: Number, default: 0 } // Add default votes to support voting
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
