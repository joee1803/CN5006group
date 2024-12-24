import React, { useState } from 'react';
import axios from 'axios';
import API_URL from './helper';

const TeamsByAverageGoals = () => {
  const [year, setYear] = useState('');
  const [avgGoalsFor, setAvgGoalsFor] = useState(null);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setYear(e.target.value);
    setAvgGoalsFor(null); // Clear previous data
    setTeams([]); // Clear previous data
    setError(''); // Clear previous error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/get-teams-by-avg-goals/${year}`);
      if (!response.data.teams.length) {
        setError('No teams found meeting the criteria.');
        setAvgGoalsFor(null);
        setTeams([]);
      } else {
        setAvgGoalsFor(response.data.avgGoalsFor.toFixed(2)); // Format average goals to 2 decimal places
        setTeams(response.data.teams);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching teams by average goals:', error);
      alert('Error fetching teams by average goals! Re-enter the year.');
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Top Teams by Goals Scored</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Year:</label>
          <input
            type="text"
            value={year}
            onChange={handleInputChange}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Get Teams</button>
      </form>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {avgGoalsFor !== null && <p style={{ textAlign: 'center' }}>Average Goals For: {avgGoalsFor}</p>}
      {teams.length > 0 && (
        <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={tableHeaderStyle}>Team</th>
              <th style={tableHeaderStyle}>Games Played</th>
              <th style={tableHeaderStyle}>Win</th>
              <th style={tableHeaderStyle}>Draw</th>
              <th style={tableHeaderStyle}>Loss</th>
              <th style={tableHeaderStyle}>Goals For</th>
              <th style={tableHeaderStyle}>Goals Against</th>
              <th style={tableHeaderStyle}>Points</th>
              <th style={tableHeaderStyle}>Year</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{team.Team}</td>
                <td style={tableCellStyle}>{team.GamesPlayed}</td>
                <td style={tableCellStyle}>{team.Win}</td>
                <td style={tableCellStyle}>{team.Draw}</td>
                <td style={tableCellStyle}>{team.Loss}</td>
                <td style={tableCellStyle}>{team.GoalsFor}</td>
                <td style={tableCellStyle}>{team.GoalsAgainst}</td>
                <td style={tableCellStyle}>{team.Points}</td>
                <td style={tableCellStyle}>{team.Year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const formContainerStyle = {
  maxWidth: '800px',
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

const tableHeaderStyle = {
  padding: '10px',
  borderBottom: '2px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
};

export default TeamsByAverageGoals;
