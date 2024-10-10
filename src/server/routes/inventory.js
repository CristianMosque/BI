const express = require('express');
const router = express.Router();
const { pool } = require('../index');

router.get('/barcode/:code', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventario WHERE codigo_barras = ?', [req.params.code]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await pool.query('UPDATE inventario SET cantidad = ? WHERE id = ?', [req.body.quantity, req.params.id]);
    res.json({ message: 'Inventory updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating inventory' });
  }
});

module.exports = router;