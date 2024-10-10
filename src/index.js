require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const socialMediaRoutes = require('./routes/socialMedia');
const marketingRoutes = require('./routes/marketing');
const botRoutes = require('./routes/bot');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes
app.use('/api/social-media', socialMediaRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/bot', botRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { pool };