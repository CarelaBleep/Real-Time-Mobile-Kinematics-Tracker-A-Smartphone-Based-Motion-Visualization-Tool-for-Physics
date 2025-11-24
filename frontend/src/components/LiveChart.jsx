import { Play, Pause, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function LiveChart({ data, isTracking, onPlay, onReset }) {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Velocity Over Time</h3>
          <p className="chart-subtitle">Measured in m/s</p>
        </div>
        <div className="chart-controls">
          <button
            onClick={onPlay}
            className="btn-icon"
            title={isTracking ? 'Pause' : 'Play'}
          >
            {isTracking ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={onReset}
            className="btn-icon"
            title="Reset"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      <div className="chart-area">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="accelGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #4b5563',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value) => value.toFixed(2)}
              />
              <Line
                type="monotone"
                dataKey="velocity"
                stroke="#3b82f6"
                dot={false}
                strokeWidth={3}
                isAnimationActive={true}
                animationDuration={0}
                fill="url(#velocityGradient)"
              />
              <Line
                type="monotone"
                dataKey="acceleration"
                stroke="#f97316"
                dot={false}
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={0}
                opacity={0.6}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">
            <p className="chart-empty-text">▶ Start tracking to see live data</p>
            <p className="chart-empty-subtext">Velocity and acceleration will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveChart;
