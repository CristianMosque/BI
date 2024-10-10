const express = require('express');
const router = express.Router();
const { pool } = require('../index');

router.get('/requirements', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM requisitos_legales WHERE completado = 0 ORDER BY fecha_limite');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching legal requirements' });
  }
});

router.get('/alerts', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM requisitos_legales WHERE completado = 0 AND fecha_limite <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)');
    const alerts = rows.map(row => ({
      message: `${row.descripcion} debe completarse antes del ${row.fecha_limite}`
    }));
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching legal alerts' });
  }
});

router.put('/requirements/:id/complete', async (req, res) => {
  try {
    await pool.query('UPDATE requisitos_legales SET completado = 1 WHERE id = ?', [req.params.id]);
    res.json({ message: 'Requirement marked as completed' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating requirement' });
  }
});

module.exports = router;