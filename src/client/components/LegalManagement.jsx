import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LegalManagement() {
  const [legalRequirements, setLegalRequirements] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchLegalRequirements();
    fetchAlerts();
  }, []);

  const fetchLegalRequirements = async () => {
    try {
      const response = await axios.get('/api/legal/requirements');
      setLegalRequirements(response.data);
    } catch (error) {
      console.error('Error fetching legal requirements:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('/api/legal/alerts');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching legal alerts:', error);
    }
  };

  const handleRequirementCompletion = async (id) => {
    try {
      await axios.put(`/api/legal/requirements/${id}/complete`);
      fetchLegalRequirements();
      fetchAlerts();
    } catch (error) {
      console.error('Error completing requirement:', error);
    }
  };

  return (
    <div>
      <h2>Gestión Legal y Normativa</h2>
      <div>
        <h3>Requisitos Legales</h3>
        <ul>
          {legalRequirements.map((req) => (
            <li key={req.id}>
              {req.description} - Fecha límite: {req.dueDate}
              <button onClick={() => handleRequirementCompletion(req.id)}>Marcar como Completado</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Alertas Legales</h3>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LegalManagement;