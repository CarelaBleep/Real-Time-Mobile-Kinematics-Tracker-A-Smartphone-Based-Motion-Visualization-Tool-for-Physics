import { Routes, Route, NavLink } from 'react-router-dom';
import './styles/App.css'; // Ensure you import the CSS file

// Import your pages
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';

function App() {
  return (
    <div>
      {/* --- Modern Navigation Bar --- */}
      <nav className="navbar">
        {/* 1. Logo / Brand Name */}
        <div className="logo"></div>

        {/* 2. Navigation Links */}
        <div className="nav-links">
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
          
          <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>
        </div>
      </nav>

      {/* --- Page Content --- */}
      {/* Adding some padding here so content doesn't hide behind sticky nav if used */}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;