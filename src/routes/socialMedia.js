const express = require('express');
const router = express.Router();
const { pool } = require('../index');

// Ruta para obtener estadísticas de redes sociales
router.get('/stats', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM social_media_stats');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Aquí puedes agregar más rutas para interactuar con Meta, LinkedIn, etc.

module.exports = router;