import React from 'react';
import StepCard from '../components/features/StepCard';

const HowItWorks = () => (
  <section className="section">
    <h2 className="section-title">How It Works</h2>
    <div className="steps-grid">
      <StepCard icon="📱" gradientClass="step-icon-1" title="Enable Sensors" desc="Enable the accelerometers" />
      <StepCard icon="〰️" gradientClass="step-icon-2" title="Track Motion" desc="Record object movement" />
      <StepCard icon="📊" gradientClass="step-icon-3" title="View Data" desc="Analyze measurements" />
    </div>
  </section>
);

export default HowItWorks;