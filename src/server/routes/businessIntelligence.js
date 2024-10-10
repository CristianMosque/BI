const express = require('express');
const router = express.Router();
const { pool } = require('../index');

router.get('/sales', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT fecha, SUM(monto) as total FROM ventas GROUP BY fecha ORDER BY fecha');
    const labels = rows.map(row => row.fecha);
    const data = rows.map(row => row.total);
    res.json({
      labels,
      datasets: [{
        label: 'Ventas',
        data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sales data' });
  }
});

router.get('/inventory', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT nombre, cantidad FROM inventario');
    const labels = rows.map(row => row.nombre);
    const data = rows.map(row => row.cantidad);
    res.json({
      labels,
      datasets: [{
        label: 'Inventario',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }]
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching inventory data' });
  }
});

router.get('/alerts', async (req, res) => {
  try {
    const alerts = [];
    
    // Check for low inventory
    const [lowInventory] = await pool.query('SELECT nombre FROM inventario WHERE cantidad < 10');
    lowInventory.forEach(item => {
      alerts.push({ message: `Low inventory for ${item.nombre}` });
    });

    // Check for upcoming payroll
    const [payrollDue] = await pool.query('SELECT fecha FROM nomina WHERE fecha > NOW() ORDER BY fecha LIMIT 1');
    if (payrollDue.length > 0) {
      alerts.push({ message: `Upcoming payroll due on ${payrollDue[0].fecha}` });
    }

    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching alerts' });
  }
});

module.exports = router;