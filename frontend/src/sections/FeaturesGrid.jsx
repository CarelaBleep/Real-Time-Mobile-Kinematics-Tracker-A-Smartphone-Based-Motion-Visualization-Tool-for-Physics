import React from 'react';
import FeatureCard from '../components/features/FeatureCard';

const FeaturesGrid = () => (
  <div className="features-grid">
    <FeatureCard icon="📊" colorClass="icon-blue" title="Real-time Data" desc="Continuous tracking and monitoring" />
    <FeatureCard icon="📈" colorClass="icon-green" title="Live Graphs" desc="Real-time visualization" />
    <FeatureCard icon="📱" colorClass="icon-purple" title="Easy-to-Use" desc="Optimized controls" />
  </div>
);

export default FeaturesGrid;