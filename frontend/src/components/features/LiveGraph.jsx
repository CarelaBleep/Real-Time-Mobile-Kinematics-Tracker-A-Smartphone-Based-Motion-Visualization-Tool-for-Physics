
import React, { useMemo } from 'react';

const LiveGraph = ({ data, isTracking, onToggle }) => {
  const { points, areaPoints } = useMemo(() => {
    const minY = Math.min(...data.map(d => d.y));
    const maxY = Math.max(...data.map(d => d.y));
    const range = maxY - minY > 0 ? maxY - minY : 1;
    const graphPadding = 20;
    const effectiveWidth = 500 - (graphPadding * 2);

    const normalizedData = data.map(d => ({
      x: d.x,
      y: ((d.y - minY) / range) * 150 
    }));

    const pts = normalizedData.map((d, i) => {
      const x = graphPadding + (i / normalizedData.length) * effectiveWidth; 
      const y = 150 - d.y; 
      return `${x},${y}`;
    }).join(' ');

    const firstX = graphPadding;
    const lastX = graphPadding + effectiveWidth;
    const areaPts = `${firstX},150 ${pts} ${lastX},150`;

    return { points: pts, areaPoints: areaPts };
  }, [data]);

  return (
    <section className="section">
      <div className="demo-header-aligned"> 
        <h2 className="demo-section-title">Live Demo</h2>
        <div className="graph-control-button" onClick={onToggle}>
          {isTracking ? (
            <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </div>
      </div>
      <div className="live-demo-graph-container">
        <svg className="live-demo-graph" viewBox="0 0 500 150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4299E1" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#1A202C" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polyline points={points} className="graph-line" />
          <polyline points={areaPoints} className="graph-area" />
        </svg>
        <span className="graph-label-ms">m/s</span>
        <span className="graph-label-bottom left">0</span>
        <span className="graph-label-bottom right">5</span>
      </div>
    </section>
  );
};

export default LiveGraph;