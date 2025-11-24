function HeroSection({ onStart, isTracking, onReset }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <span className="subheading">PHYSICS SIMULATION</span>
          <h1 className="heading-1">
            Motion Tracker
            <span className="gradient-text-span">in Real-Time</span>
          </h1>
          <p className="text-body">
            Measure distance, velocity, acceleration, and time with precision. 
            Perfect for physics experiments and classroom demonstrations.
          </p>
          
          <div className="button-group">
            <button 
              onClick={onStart}
              className="btn btn-primary"
            >
              {isTracking ? '⏸ Pause Tracking' : '▶ Start Tracking'}
            </button>
            <button 
              onClick={onReset}
              className="btn btn-secondary"
            >
              ↻ Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;