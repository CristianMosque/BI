import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Orders() {
  const [orders, setOrders] = useState([])
  const [newOrder, setNewOrder] = useState({ customer: '', product: '', quantity: 1 })

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/orders', newOrder)
      setNewOrder({ customer: '', product: '', quantity: 1 })
      fetchOrders()
    } catch (error) {
      console.error('Error creating order:', error)
    }
  }

  return (
    <div>
      <h2>Pedidos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customer"
          value={newOrder.customer}
          onChange={handleInputChange}
          placeholder="Cliente"
          required
        />
        <input
          type="text"
          name="product"
          value={newOrder.product}
          onChange={handleInputChange}
          placeholder="Producto"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newOrder.quantity}
          onChange={handleInputChange}
          placeholder="Cantidad"
          min="1"
          required
        />
        <button type="submit">Crear Pedido</button>
      </form>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Cliente: {order.customer}, Producto: {order.product}, Cantidad: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders