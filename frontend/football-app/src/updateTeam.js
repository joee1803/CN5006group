import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './helper';

const UpdateTeam = () => {
  const [formData, setFormData] = useState({
    Team: "",
    GamesPlayed: "",
    Win: "",
    Draw: "",
    Loss: "",
    GoalsFor: "",
    GoalsAgainst: "",
    Points: "",
    Year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/update-data`, formData);
      alert("Team updated successfully!");
      setFormData({
        Team: "",
        GamesPlayed: "",
        Win: "",
        Draw: "",
        Loss: "",
        GoalsFor: "",
        GoalsAgainst: "",
        Points: "",
        Year: "",
      }); // Clear form data after submission
    } catch (error) {
      console.error(error);
      alert("Error updating team!");
    }
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Update Team</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={fieldStyle}>
            <label style={labelStyle}>{key}:</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        ))}
        <button type="submit" style={buttonStyle}>Update Team</button>
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
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  alignSelf: 'center',
  marginTop: '20px',
};

export default UpdateTeam;
