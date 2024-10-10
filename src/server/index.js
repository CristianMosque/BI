require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const socialMediaRoutes = require('./routes/socialMedia');
const marketingRoutes = require('./routes/marketing');
const botRoutes = require('./routes/bot');
const wooCommerceRoutes = require('./routes/wooCommerce');
const inventoryRoutes = require('./routes/inventory');
const businessIntelligenceRoutes = require('./routes/businessIntelligence');
const payrollRoutes = require('./routes/payroll');
const invoicingRoutes = require('./routes/invoicing');
const legalRoutes = require('./routes/legal');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const crmRoutes = require('./routes/crm');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: '193.203.175.121',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'u972125344_DB_BI_PRO',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authenticateToken, userRoutes);
app.use('/api/social-media', authenticateToken, socialMediaRoutes);
app.use('/api/marketing', authenticateToken, marketingRoutes);
app.use('/api/bot', authenticateToken, botRoutes);
app.use('/api/woocommerce', authenticateToken, wooCommerceRoutes);
app.use('/api/inventory', authenticateToken, inventoryRoutes);
app.use('/api/business-intelligence', authenticateToken, businessIntelligenceRoutes);
app.use('/api/payroll', authenticateToken, payrollRoutes);
app.use('/api/invoicing', authenticateToken, invoicingRoutes);
app.use('/api/legal', authenticateToken, legalRoutes);
app.use('/api/crm', authenticateToken, crmRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = { pool, authenticateToken };