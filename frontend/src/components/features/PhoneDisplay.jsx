import React from 'react';
import MetricCard from './MetricCard';

const PhoneDisplay = ({ data }) => (
  <div className="phone-display">
    <MetricCard label="Distance" value={data.distance.toFixed(1)} unit="m" isLarge />
    <MetricCard label="Velocity" value={data.velocity.toFixed(2)} unit="m/s" />
    <MetricCard label="Acceleration" value={data.acceleration.toFixed(2)} unit="m/s²" />
    <MetricCard label="Time" value={data.time.toFixed(2)} unit="s" />
  </div>
);

export default PhoneDisplay;