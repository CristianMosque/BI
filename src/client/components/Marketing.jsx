import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Marketing() {
  const [campaigns, setCampaigns] = useState([])
  const [newCampaign, setNewCampaign] = useState({ name: '', type: 'email', content: '' })

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('/api/marketing/campaigns')
      setCampaigns(response.data)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    }
  }

  const handleInputChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/marketing/campaigns', newCampaign)
      setNewCampaign({ name: '', type: 'email', content: '' })
      fetchCampaigns()
    } catch (error) {
      console.error('Error creating campaign:', error)
    }
  }

  const handleSendCampaign = async (id) => {
    try {
      await axios.post(`/api/marketing/campaigns/${id}/send`)
      alert('Campaña enviada con éxito')
    } catch (error) {
      console.error('Error sending campaign:', error)
      alert('Error al enviar la campaña')
    }
  }

  return (
    <div>
      <h2>Marketing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newCampaign.name}
          onChange={handleInputChange}
          placeholder="Nombre de la campaña"
          required
        />
        <select name="type" value={newCampaign.type} onChange={handleInputChange}>
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <textarea
          name="content"
          value={newCampaign.content}
          onChange={handleInputChange}
          placeholder="Contenido de la campaña"
          required
        />
        <button type="submit">Crear Campaña</button>
      </form>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            {campaign.name} - Tipo: {campaign.type}
            <button onClick={() => handleSendCampaign(campaign.id)}>Enviar Campaña</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Marketing