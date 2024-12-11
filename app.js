const express = require('express');
const cors = require('cors');
const authRoute = require('./app/routes/authRouter');
const form = require('./app/routes/formtRoute');
require('./app/config/db');
require('dotenv').config();

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || origin === 'http://localhost:8000' || origin === 'https://localhost:8000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

// Use CORS middleware with specified options
app.use(cors(corsOptions));
app.use(express.json());

// Define your routes
app.use('/api', authRoute);
app.use('/api', form);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  process.exit(0);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
