import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [payrollReport, setPayrollReport] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const generatePayroll = async () => {
    try {
      const response = await axios.post('/api/payroll/generate');
      setPayrollReport(response.data);
    } catch (error) {
      console.error('Error generating payroll:', error);
    }
  };

  return (
    <div>
      <h2>Nómina y Seguridad Social</h2>
      <button onClick={generatePayroll}>Generar Nómina</button>
      {payrollReport && (
        <div>
          <h3>Reporte de Nómina</h3>
          <p>Total a pagar: ${payrollReport.totalPayroll}</p>
          <p>Aportes a Seguridad Social: ${payrollReport.socialSecurity}</p>
          <ul>
            {payrollReport.employeePayments.map((payment, index) => (
              <li key={index}>
                {payment.name}: ${payment.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
      <h3>Empleados</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - Salario: ${employee.salary}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Payroll;