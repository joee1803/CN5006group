import React, { useState } from "react";
import axios from "axios";
import API_URL from "./helper";

const DisplayTopTeams = () => {
  const [minWins, setMinWins] = useState(""); // Input for minimum wins
  const [teams, setTeams] = useState([]); // List of teams to display
  const [error, setError] = useState(""); // Error message

  const handleInputChange = (e) => {
    setMinWins(e.target.value);
    setTeams([]); // Clear previous teams data
    setError(""); // Clear previous error message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Fetch top teams based on minimum wins
      const response = await axios.get(`${API_URL}/get-top-teams/${minWins}`);
      if (response.data.length === 0) {
        setError("No teams found meeting the criteria.");
        setTeams([]);
      } else {
        setTeams(response.data); // Set the response data
        setError("");
      }
    } catch (err) {
      // Handle errors (e.g., no teams found or invalid input)
      setError(err.response?.data?.message || "An error occurred");
      setTeams([]); // Clear any previous teams data
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Top 10 Teams</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Minimum Wins:</label>
          <input
            type="number"
            value={minWins}
            onChange={handleInputChange}
            placeholder="Enter minimum number of wins"
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>Fetch Teams</button>
      </form>

      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}

      {/* Teams Table */}
      {teams.length > 0 && (
        <table style={{ marginTop: "20px", width: "100%", borderCollapse: 'collapse', textAlign: 'left' }}>
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

export default DisplayTopTeams;
