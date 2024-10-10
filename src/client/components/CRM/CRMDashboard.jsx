import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalesFunnel from './SalesFunnel';
import CustomerList from './CustomerList';
import OrderManagement from './OrderManagement';
import MarketingActions from './MarketingActions';

function CRMDashboard() {
  const [funnels, setFunnels] = useState([]);
  const [selectedFunnel, setSelectedFunnel] = useState(null);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchFunnels();
    fetchCustomers();
  }, []);

  const fetchFunnels = async () => {
    try {
      const response = await axios.get('/api/crm/funnels');
      setFunnels(response.data);
      if (response.data.length > 0) {
        setSelectedFunnel(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching funnels:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/crm/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleFunnelChange = (event) => {
    const selectedFunnelId = event.target.value;
    const funnel = funnels.find(f => f.id === selectedFunnelId);
    setSelectedFunnel(funnel);
  };

  return (
    <div>
      <h2>CRM Dashboard</h2>
      <select onChange={handleFunnelChange}>
        {funnels.map(funnel => (
          <option key={funnel.id} value={funnel.id}>{funnel.name}</option>
        ))}
      </select>
      {selectedFunnel && <SalesFunnel funnel={selectedFunnel} customers={customers} />}
      <CustomerList customers={customers} />
      <OrderManagement customers={customers} />
      <MarketingActions customers={customers} />
    </div>
  );
}

export default CRMDashboard;