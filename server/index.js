const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const internshipsRoutes = require('./routes/internships');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection - ✅ FIXED (deprecated options removed)
mongoose.connect('mongodb://localhost:27017/internship-tracker')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// Routes
app.use('/api', internshipsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Internship Tracker API is running' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});