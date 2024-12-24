import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './helper';

const DeleteTeam = () => {
  const [teamName, setTeamName] = useState('');

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/delete-data`, { Team: teamName });
      alert('Team successfully deleted!');
      setTeamName(''); // Clear the input after deletion
    } catch (error) {
      console.error(error);
      alert('Error deleting team! Team not found in the database.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Delete Team</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Delete Team</button>
      </form>
    </div>
  );
};

const formContainerStyle = {
  maxWidth: '600px',
  margin: '50px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f9f9f9',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const fieldStyle = {
  display: 'flex',
  alignItems: 'center',
};

const labelStyle = {
  flex: '1',
  fontSize: '16px',
  color: '#333',
  textAlign: 'right',
  marginRight: '10px',
};

const inputStyle = {
  flex: '2',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: '10px',
  fontSize: '18px',
  color: '#fff',
  backgroundColor: 'red',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  alignSelf: 'center',
  marginTop: '20px',
};

export default DeleteTeam;
