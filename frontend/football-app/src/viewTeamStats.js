import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './helper';

const TeamStats = () => {
  const [teamName, setTeamName] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTeamName(e.target.value);
    setStats(null);  // Clear previous stats
    setError('');    // Clear previous error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/teamstats/${teamName}`);
      if (response.data.length === 0) {
        setError('Team not found in the database.');
        setStats(null);
      } else {
        setStats(response.data);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      alert('Error fetching stats.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h3 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Team Stats</h3>
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
        <button type="submit" style={buttonStyle}>Get Stats</button>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {stats && (
        <div style={statsContainerStyle}>
          <h3 style={subHeadingStyle}>Stats for {teamName}</h3>
          <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={tableHeaderStyle}>Year</th>
                <th style={tableHeaderStyle}>Games Played</th>
                <th style={tableHeaderStyle}>Draws</th>
                <th style={tableHeaderStyle}>Wins</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((yearStat, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={tableCellStyle}>{yearStat._id}</td>
                  <td style={tableCellStyle}>{yearStat.totalGamesPlayed}</td>
                  <td style={tableCellStyle}>{yearStat.totalDrawn}</td>
                  <td style={tableCellStyle}>{yearStat.totalWon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

const statsContainerStyle = {
  marginTop: '20px',
};

const subHeadingStyle = {
  textAlign: 'center',
  color: '#333',
  marginBottom: '20px',
};

const tableHeaderStyle = {
  padding: '10px',
  borderBottom: '2px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
};

export default TeamStats;
