const express = require('express');
const router = express.Router();
const { pool } = require('../index');

router.get('/employees', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empleados');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

router.post('/generate', async (req, res) => {
  try {
    const [employees] = await pool.query('SELECT * FROM empleados');
    let totalPayroll = 0;
    let socialSecurity = 0;
    const employeePayments = [];

    employees.forEach(employee => {
      const payment = employee.salario;
      totalPayroll += payment;
      socialSecurity += payment * 0.0765; // Ejemplo de cálculo de seguridad social
      employeePayments.push({
        name: employee.nombre,
        amount: payment
      });
    });

    // Aquí deberías guardar esta información en la base de datos

    res.json({
      totalPayroll,
      socialSecurity,
      employeePayments
    });
  } catch (error) {
    res.status(500).json({ error: 'Error generating payroll' });
  }
});

module.exports = router;