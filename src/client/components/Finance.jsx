import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Finance() {
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0
  })
  const [newTransaction, setNewTransaction] = useState({ type: 'revenue', amount: 0, description: '' })

  useEffect(() => {
    fetchFinancialData()
  }, [])

  const fetchFinancialData = async () => {
    try {
      const response = await axios.get('/api/finance')
      setFinancialData(response.data)
    } catch (error) {
      console.error('Error fetching financial data:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/finance/transactions', newTransaction)
      setNewTransaction({ type: 'revenue', amount: 0, description: '' })
      fetchFinancialData()
    } catch (error) {
      console.error('Error creating transaction:', error)
    }
  }

  return (
    <div>
      <h2>Finanzas</h2>
      <div>
        <h3>Resumen Financiero</h3>
        <p>Ingresos Totales: ${financialData.totalRevenue}</p>
        <p>Gastos Totales: ${financialData.totalExpenses}</p>
        <p>Beneficio Neto: ${financialData.netProfit}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <select name="type" value={newTransaction.type} onChange={handleInputChange}>
          <option value="revenue">Ingreso</option>
          <option value="expense">Gasto</option>
        </select>
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          placeholder="Monto"
          required
        />
        <input
          type="text"
          name="description"
          value={newTransaction.description}
          onChange={handleInputChange}
          placeholder="Descripción"
          required
        />
        <button type="submit">Registrar Transacción</button>
      </form>
    </div>
  )
}

export default Finance