import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/all');
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Usuarios</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email} - Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;