import React, { useState, useEffect, useRef } from 'react';

// !!! IMPORTANT: CHANGE THIS TO YOUR COMPUTER'S LOCAL IP !!!
// On Windows: run `ipconfig`, look for IPv4 Address.
// On Mac: run `ipconfig getifaddr en0`
const API_URL = "http://192.168.1.163"; 

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; 
  const toRad = (val) => (val * Math.PI) / 180;
  const x = (toRad(lon2) - toRad(lon1)) * Math.cos((toRad(lat1) + toRad(lat2)) / 2);
  const y = toRad(lat2) - toRad(lat1);
  return Math.sqrt(x * x + y * y) * R;
};

const MetricCard = ({ title, value, unit, icon, color }) => (
  <div className="card" style={{ borderTop: `4px solid ${color}` }}>
    <div className="icon" style={{ background: color }}>{icon}</div>
    <div>
      <h3>{title}</h3>
      <div className="value">{Number(value).toFixed(2)} <span>{unit}</span></div>
    </div>
  </div>
);

const Dashboard = () => {
  // Real-time State
  const [metrics, setMetrics] = useState({ speed: 0, totalDistance: 0 });
  const [status, setStatus] = useState('Waiting for GPS...');
  const [dbHistory, setDbHistory] = useState([]);
  
  // References for calculation
  const historyRef = useRef({ prevLat: null, prevLon: null, prevTime: null, totalDist: 0 });

  // --- 1. TRACKING LOGIC (Runs on Phone) ---
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('GPS Not Supported');
      return;
    }

    const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

    const success = (pos) => {
      setStatus('Tracking Active 🟢');
      const { latitude, longitude, speed, accuracy } = pos.coords;
      const now = pos.timestamp;
      const data = historyRef.current;

      // Distance Calculation
      if (data.prevLat) {
        const dist = calculateDistance(data.prevLat, data.prevLon, latitude, longitude);
        data.totalDist += dist;
      }

      // Update UI
      setMetrics({
        speed: speed || 0, // specific phone GPS speed
        totalDistance: data.totalDist
      });

      // Update Refs
      data.prevLat = latitude;
      data.prevLon = longitude;
      data.prevTime = now;

      // SEND TO MONGODB
      fetch(`${API_URL}/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude, speed, accuracy })
      }).catch(err => console.error("Send Error:", err));
    };

    const error = (err) => {
      console.error(err);
      setStatus('GPS Signal Lost 🔴');
    };

    const watchId = navigator.geolocation.watchPosition(success, error, options);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // --- 2. FETCHING HISTORY LOGIC (Runs on Website) ---
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/history`);
        const data = await res.json();
        setDbHistory(data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    // Poll database every 2 seconds
    fetchHistory();
    const interval = setInterval(fetchHistory, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Motion Analytics 📊</h1>
        <div className="status">{status}</div>
      </header>

      <div className="grid">
        <MetricCard title="Current Speed" value={metrics.speed} unit="m/s" icon="⚡" color="#667eea" />
        <MetricCard title="Total Distance" value={metrics.totalDistance} unit="m" icon="📍" color="#48bb78" />
      </div>

      <div className="history-section">
        <h2>Live Database Feed (MongoDB)</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Lat</th>
                <th>Lon</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              {dbHistory.map((row, i) => (
                <tr key={i}>
                  <td>{new Date(row.timestamp).toLocaleTimeString()}</td>
                  <td>{row.latitude.toFixed(5)}</td>
                  <td>{row.longitude.toFixed(5)}</td>
                  <td>{row.speed ? row.speed.toFixed(2) : 0} m/s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        body { margin: 0; font-family: sans-serif; background: #f4f7f6; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .status { background: #fff; padding: 5px 15px; border-radius: 20px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
        .card { background: white; padding: 20px; border-radius: 10px; display: flex; align-items: center; gap: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; }
        .value { font-size: 1.5rem; font-weight: bold; margin-top: 5px; }
        .value span { font-size: 0.9rem; color: #888; font-weight: normal; }
        
        .history-section { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .table-wrapper { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #eee; }
        th { color: #888; font-size: 0.85rem; }
      `}</style>
    </div>
  );
};

export default Dashboard;