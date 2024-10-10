const express = require('express');
const router = express.Router();
const { pool } = require('../index');

// Get all funnels
router.get('/funnels', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM funnels WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching funnels' });
  }
});

// Get all customers
router.get('/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customers WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching customers' });
  }
});

// Update customer stage
router.put('/customers/:id/stage', async (req, res) => {
  try {
    const { stage } = req.body;
    await pool.query('UPDATE customers SET stage = ? WHERE id = ? AND user_id = ?', [stage, req.params.id, req.user.id]);
    res.json({ message: 'Customer stage updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating customer stage' });
  }
});

// Send receipt
router.post('/orders/:id/send-receipt', async (req, res) => {
  try {
    // Implement logic to send receipt
    res.json({ message: 'Receipt sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending receipt' });
  }
});

// Generate shipping label
router.post('/orders/:id/generate-shipping-label', async (req, res) => {
  try {
    // Implement logic to generate and send shipping label
    res.json({ message: 'Shipping label generated and sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error generating shipping label' });
  }
});

// Send mass email
router.post('/marketing/mass-email', async (req, res) => {
  try {
    const { segment, template } = req.body;
    // Implement logic to send mass email based on segment and template
    res.json({ message: 'Mass email sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending mass email' });
  }
});

module.exports = router;