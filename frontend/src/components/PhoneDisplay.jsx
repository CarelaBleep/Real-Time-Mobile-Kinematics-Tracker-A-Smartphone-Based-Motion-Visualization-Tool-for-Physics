function PhoneDisplay({ stats, isTracking }) {
  return (
    <div className="phone-wrapper">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-screen">
          <div className="phone-dot"></div>
          
          <div className="phone-metrics">
            {stats.map((stat, i) => (
              <div key={i} className={`phone-metric-item metric-card-${stat.color}`}>
                <div className="metric-header">
                  <p className="metric-label">{stat.label}</p>
                  <stat.icon size={16} className="metric-icon" />
                </div>
                <p className="phone-metric-value">{stat.value}</p>
                <p className="metric-unit">{stat.unit}</p>
              </div>
            ))}
          </div>

          <div className="phone-status">
            <div className={`status-dot ${isTracking ? 'active' : 'inactive'}`}></div>
            <div className={`status-dot ${isTracking ? 'active' : 'inactive'}`}></div>
            <div className={`status-dot ${isTracking ? 'active' : 'inactive'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneDisplay;

