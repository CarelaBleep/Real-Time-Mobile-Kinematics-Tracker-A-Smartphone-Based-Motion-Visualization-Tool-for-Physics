import React from 'react';

const FeatureCard = ({ icon, colorClass, title, desc }) => (
  <div className="feature-card">
    <div className={`icon-circle ${colorClass}`}>{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{desc}</p>
  </div>
);

export default FeatureCard;