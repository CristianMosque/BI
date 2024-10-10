const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../index');

router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.query('INSERT INTO usuarios (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role]);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;