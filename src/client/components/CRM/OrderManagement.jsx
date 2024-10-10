import React from 'react';
import axios from 'axios';

function OrderManagement({ customers }) {
  const sendReceipt = async (orderId) => {
    try {
      await axios.post(`/api/crm/orders/${orderId}/send-receipt`);
      alert('Receipt sent successfully');
    } catch (error) {
      console.error('Error sending receipt:', error);
      alert('Error sending receipt');
    }
  };

  const generateShippingLabel = async (orderId) => {
    try {
      await axios.post(`/api/crm/orders/${orderId}/generate-shipping-label`);
      alert('Shipping label generated and sent to provider');
    } catch (error) {
      console.error('Error generating shipping label:', error);
      alert('Error generating shipping label');
    }
  };

  return (
    <div>
      <h3>Order Management</h3>
      {customers.map(customer => (
        <div key={customer.id}>
          <h4>{customer.name}'s Orders</h4>
          {customer.orders.map(order => (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.total}</p>
              <button onClick={() => sendReceipt(order.id)}>Send Receipt</button>
              <button onClick={() => generateShippingLabel(order.id)}>Generate Shipping Label</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default OrderManagement;