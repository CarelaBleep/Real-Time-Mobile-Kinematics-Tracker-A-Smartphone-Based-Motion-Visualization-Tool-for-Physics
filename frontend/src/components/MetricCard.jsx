function MetricCard({ icon: Icon, label, value, unit, color }) {
  return (
    <div className={`metric-card metric-card-${color}`}>
      <div className="metric-header">
        <p className="metric-label">{label}</p>
        <Icon size={16} className="metric-icon" />
      </div>
      <p className="metric-value">{value}</p>
      <p className="metric-unit">{unit}</p>
    </div>
  );
}

export default MetricCard;

