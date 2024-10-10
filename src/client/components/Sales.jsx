import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Sales() {
  const [sales, setSales] = useState([])
  const [newSale, setNewSale] = useState({ product: '', amount: 0 })

  useEffect(() => {
    fetchSales()
  }, [])

  const fetchSales = async () => {
    try {
      const response = await axios.get('/api/sales')
      setSales(response.data)
    } catch (error) {
      console.error('Error fetching sales:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewSale({ ...newSale, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/sales', newSale)
      setNewSale({ product: '', amount: 0 })
      fetchSales()
    } catch (error) {
      console.error('Error creating sale:', error)
    }
  }

  return (
    <div>
      <h2>Ventas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product"
          value={newSale.product}
          onChange={handleInputChange}
          placeholder="Producto"
          required
        />
        <input
          type="number"
          name="amount"
          value={newSale.amount}
          onChange={handleInputChange}
          placeholder="Monto"
          required
        />
        <button type="submit">Registrar Venta</button>
      </form>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            {sale.product} - ${sale.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sales