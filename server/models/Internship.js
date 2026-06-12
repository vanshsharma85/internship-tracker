const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  appliedDate: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected']
  },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);