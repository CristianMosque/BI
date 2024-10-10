import React, { useState } from 'react';
import axios from 'axios';

function ElectronicInvoicing() {
  const [invoice, setInvoice] = useState({
    clientId: '',
    items: [{ description: '', quantity: 0, price: 0 }]
  });

  const handleClientChange = (e) => {
    setInvoice({ ...invoice, clientId: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 0, price: 0 }]
    });
  };

  const generateInvoice = async () => {
    try {
      const response = await axios.post('/api/invoicing/generate', invoice);
      // Aquí podrías manejar la respuesta, por ejemplo, mostrando un enlace para descargar la factura
      console.log('Factura generada:', response.data);
    } catch (error) {
      console.error('Error generating invoice:', error);
    }
  };

  return (
    <div>
      <h2>Facturación Electrónica</h2>
      <div>
        <label>
          Cliente ID:
          <input type="text" value={invoice.clientId} onChange={handleClientChange} />
        </label>
      </div>
      {invoice.items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Descripción"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder="Precio"
            value={item.price}
            onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
          />
        </div>
      ))}
      <button onClick={addItem}>Añadir Item</button>
      <button onClick={generateInvoice}>Generar Factura</button>
    </div>
  );
}

export default ElectronicInvoicing;