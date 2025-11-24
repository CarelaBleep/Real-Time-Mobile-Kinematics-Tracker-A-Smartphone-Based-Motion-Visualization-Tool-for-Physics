import LiveChart from './LiveChart';
import StatsPanel from './StatsPanel';

function LiveDemoSection({ velocityHistory, isTracking, onPlay, onReset }) {
  return (
    <section className="live-demo-section">
      <div className="section-header">
        <h2 className="heading-2">Live Visualization</h2>
        <p className="section-subtitle">Real-time motion data analysis</p>
      </div>

      <div className="demo-grid">
        <LiveChart 
          data={velocityHistory}
          isTracking={isTracking}
          onPlay={onPlay}
          onReset={onReset}
        />
        <StatsPanel data={velocityHistory} isTracking={isTracking} />
      </div>
    </section>
  );
}

export default LiveDemoSection;