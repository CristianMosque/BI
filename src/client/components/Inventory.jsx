import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Inventory() {
  const [inventory, setInventory] = useState([])
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0, price: 0 })

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const response = await axios.get('/api/inventory')
      setInventory(response.data)
    } catch (error) {
      console.error('Error fetching inventory:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/inventory', newProduct)
      setNewProduct({ name: '', quantity: 0, price: 0 })
      fetchInventory()
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
    <div>
      <h2>Inventario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Nombre del producto"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleInputChange}
          placeholder="Cantidad"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Precio"
          step="0.01"
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>
      <ul>
        {inventory.map((product) => (
          <li key={product.id}>
            {product.name} - Cantidad: {product.quantity}, Precio: ${product.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Inventory