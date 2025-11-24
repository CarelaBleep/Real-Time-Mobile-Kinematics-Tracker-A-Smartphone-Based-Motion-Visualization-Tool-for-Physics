function StatsPanelCard({ title, value, color }) {
  return (
    <div className={`stats-panel-card stats-panel-${color}`}>
      <p className="stats-label">{title}</p>
      <p className="stats-value">{value}</p>
    </div>
  );
}

function StatsPanel({ data, isTracking }) {
  const maxVelocity = data.length > 0 ? Math.max(...data.map(d => d.velocity)).toFixed(2) : '0.00';
  const avgVelocity = data.length > 0 ? (data.reduce((a, b) => a + b.velocity, 0) / data.length).toFixed(2) : '0.00';
  const dataPoints = data.length;

  return (
    <div className="stats-panel">
      <StatsPanelCard title="Max Velocity" value={`${maxVelocity} m/s`} color="blue" />
      <StatsPanelCard title="Avg Velocity" value={`${avgVelocity} m/s`} color="purple" />
      <StatsPanelCard title="Data Points" value={dataPoints} color="orange" />
      <StatsPanelCard title="Status" value={isTracking ? '● Recording' : '● Idle'} color={isTracking ? 'green' : 'gray'} />
    </div>
  );
}

export default StatsPanel;
