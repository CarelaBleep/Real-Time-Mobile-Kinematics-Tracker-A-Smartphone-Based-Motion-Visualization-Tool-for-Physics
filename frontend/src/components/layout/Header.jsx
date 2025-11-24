import React from 'react';

const Header = ({ isTracking, onToggle, onReset }) => (
  <div className="header-content">
    <h1 className="main-title">Physics Motion Tracker</h1>
    <p className="subtitle">
      Measure distance, velocity, acceleration, and time through any cell-smart phone.
    </p>
    <div className="button-group">
      <button 
        className={`btn-primary ${isTracking ? 'active' : ''}`}
        onClick={onToggle}
      >
        {isTracking ? 'Stop Tracking' : 'Get Started'}
      </button>
      <button 
        className="btn-reset"
        onClick={onReset}
        disabled={isTracking}
      >
        Reset
      </button>
    </div>
  </div>
);

export default Header;