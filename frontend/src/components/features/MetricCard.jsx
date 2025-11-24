import React from 'react';

const MetricCard = ({ label, value, unit, isLarge = false }) => (
  <div className="metric">
    <div className={`metric-value ${isLarge ? 'large' : ''}`}>
      {value} {unit}
    </div>
    <div className="metric-label">{label}</div>
  </div>
);

export default MetricCard;