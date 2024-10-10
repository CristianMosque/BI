const express = require('express');
const router = express.Router();
const { pool } = require('../index');

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, email, role FROM usuarios WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { email } = req.body;
    await pool.query('UPDATE usuarios SET email = ? WHERE id = ?', [email, req.user.id]);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user profile' });
  }
});

// Admin route to get all users
router.get('/all', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }
  try {
    const [users] = await pool.query('SELECT id, email, role FROM usuarios');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;