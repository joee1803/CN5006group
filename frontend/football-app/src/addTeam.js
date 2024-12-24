import React, { useState } from "react";
import axios from "axios";
import API_URL from "./helper";

const AddTeam = () => {
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
    console.log("Values", formData);
    try {
      await axios.post(`${API_URL}/add-data`, formData, {
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
        },
      });
      alert("Team added successfully!");
    } catch (error) {
      console.error(error.message);
      alert("Error adding team.");
    }
  };

  return (
    <div style={formContainerStyle}>
      {" "}
      <h3 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Add Team
      </h3>{" "}
      <form onSubmit={handleSubmit} style={formStyle}>
        {" "}
        {Object.keys(formData).map((key) => (
          <div key={key} style={fieldStyle}>
            {" "}
            <label style={labelStyle}>{key}:</label>{" "}
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              style={inputStyle}
              required
            />{" "}
          </div>
        ))}{" "}
        <button type="submit" style={buttonStyle}>
          Add Team
        </button>{" "}
      </form>{" "}
    </div>
  );
};
const formContainerStyle = {
  maxWidth: "600px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
};
const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };
const fieldStyle = { display: "flex", alignItems: "center" };
const labelStyle = {
  flex: "1",
  fontSize: "16px",
  color: "#333",
  textAlign: "right",
  marginRight: "10px",
};
const inputStyle = {
  flex: "2",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
const buttonStyle = {
  padding: "10px",
  fontSize: "18px",
  color: "#fff",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  alignSelf: "center",
  marginTop: "20px",
};
export default AddTeam;
