import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WooCommerceSync() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock_quantity: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/woocommerce/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/woocommerce/products', newProduct);
      setNewProduct({ name: '', description: '', price: 0, stock_quantity: 0 });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const productToUpdate = products.find(p => p.id === id);
      await axios.put(`/api/woocommerce/products/${id}`, productToUpdate);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/woocommerce/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2>Sincronización con WooCommerce</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Nombre del producto"
          required
        />
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Descripción del producto"
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
        <input
          type="number"
          name="stock_quantity"
          value={newProduct.stock_quantity}
          onChange={handleInputChange}
          placeholder="Cantidad en stock"
          required
        />
        <button type="submit">Crear Producto</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Precio: ${product.price}, Stock: {product.stock_quantity}
            <button onClick={() => handleUpdate(product.id)}>Actualizar</button>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WooCommerceSync;