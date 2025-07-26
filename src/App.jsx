import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Journal from './components/Journal.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <span className="navbar-brand">Spending Tracker</span>
            <div className="navbar-nav">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/journal" 
                className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Journal
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<Journal />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
