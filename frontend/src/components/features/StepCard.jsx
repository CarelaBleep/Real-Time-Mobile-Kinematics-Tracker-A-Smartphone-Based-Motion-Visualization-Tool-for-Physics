import React from 'react';

const StepCard = ({ icon, gradientClass, title, desc }) => (
  <div className="step">
    <div className={`step-icon ${gradientClass}`}>{icon}</div>
    <h3 className="step-title">{title}</h3>
    <p className="step-desc">{desc}</p>
  </div>
);

export default StepCard;

