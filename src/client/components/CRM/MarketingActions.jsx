import React, { useState } from 'react';
import axios from 'axios';

function MarketingActions({ customers }) {
  const [selectedSegment, setSelectedSegment] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');

  const handleSegmentChange = (event) => {
    setSelectedSegment(event.target.value);
  };

  const handleTemplateChange = (event) => {
    setEmailTemplate(event.target.value);
  };

  const sendMassEmail = async () => {
    try {
      await axios.post('/api/crm/marketing/mass-email', {
        segment: selectedSegment,
        template: emailTemplate
      });
      alert('Mass email sent successfully');
    } catch (error) {
      console.error('Error sending mass email:', error);
      alert('Error sending mass email');
    }
  };

  return (
    <div>
      <h3>Marketing Actions</h3>
      <select onChange={handleSegmentChange}>
        <option value="">Select a segment</option>
        <option value="all">All Customers</option>
        <option value="new">New Customers</option>
        <option value="repeat">Repeat Customers</option>
      </select>
      <textarea
        value={emailTemplate}
        onChange={handleTemplateChange}
        placeholder="Enter HTML email template here"
      />
      <button onClick={sendMassEmail}>Send Mass Email</button>
    </div>
  );
}

export default MarketingActions;