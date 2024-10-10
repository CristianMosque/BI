import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function BusinessIntelligence() {
  const [salesData, setSalesData] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchSalesData();
    fetchInventoryData();
    fetchAlerts();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('/api/business-intelligence/sales');
      setSalesData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('/api/business-intelligence/inventory');
      setInventoryData(response.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/api/business-intelligence/alerts');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  return (
    <div>
      <h2>Inteligencia de Negocios</h2>
      <div>
        <h3>Ventas</h3>
        <Line data={salesData} />
      </div>
      <div>
        <h3>Inventario</h3>
        <Line data={inventoryData} />
      </div>
      <div>
        <h3>Alertas</h3>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BusinessIntelligence;