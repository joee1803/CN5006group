import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddTeam from './addTeam';
import UpdateTeam from './updateTeam';
import TeamStats from './viewTeamStats';
import DeleteTeam from './deleteTeam'; 
import DisplayTopTeams from './displayTopTeams'; 
import TeamsByAverageGoals from './avgGoals';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="container">
      <header className="header">
      <h1 className="title">Football Records Management</h1>
      <nav className="nav">
          <Link to="/" className='link'>Add Team</Link>
          <Link to="/update" className='link'>Update Team Info</Link> 
          <Link to="/stats" className='link'>View Team Stats</Link> 
          <Link to="/delete" className='link'>Delete Team</Link> 
          <Link to="/records" className='link'>Get Top Teams</Link> 
           <Link to="/average" className='link'>Get Teams by Average Goals</Link>
      </nav>
      </header>
      <main className="main">
      <Routes>
        <Route path="/" element={<AddTeam />} />
        <Route path="/update" element={<UpdateTeam />} />
        <Route path="/stats" element={<TeamStats />} />
        <Route path="/delete" element={<DeleteTeam />} /> 
        <Route path="/records" element={<DisplayTopTeams />} /> 
        <Route path="/average" element={<TeamsByAverageGoals />} />
      </Routes>
    
    </main>
        <footer className="footer">
          <p>&copy; 2024 Football Records Management. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}


export default App;
