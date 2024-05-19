const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // This option is still required
})
  .then(() => {
    console.log('\x1b[42m%s\x1b[0m', 'MongoDB connected');
  })
  .catch(err => {
    console.log('\x1b[41m%s\x1b[0m', 'MongoDB connection error:', err);
  });

// Connection Event Listeners
mongoose.connection.on('connected', () => {
  console.log('\x1b[42m%s\x1b[0m', 'Mongoose connected to MongoDB');
});

mongoose.connection.on('error', err => {
  console.log('\x1b[41m%s\x1b[0m', 'Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('\x1b[41m%s\x1b[0m', 'Mongoose disconnected from MongoDB');
});

// Routes
const trainingCenters = require('./routes/trainingCenters');
app.use('/api/trainingCenters', trainingCenters);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\x1b[42m%s\x1b[0m`, `Server running on port ${PORT}`);
});

// Server Event Listeners
server.on('error', err => {
  console.log('\x1b[41m%s\x1b[0m', 'Server error:', err);
});

server.on('close', () => {
  console.log('\x1b[41m%s\x1b[0m', 'Server closed');
  mongoose.connection.close(() => {
    console.log('\x1b[41m%s\x1b[0m', 'MongoDB connection closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('\x1b[41m%s\x1b[0m', 'Server terminated');
  });
});