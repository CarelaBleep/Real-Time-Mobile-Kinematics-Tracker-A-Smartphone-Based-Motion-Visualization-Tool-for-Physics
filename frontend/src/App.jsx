import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Gauge, Zap } from 'lucide-react';
import BackgroundBlobs from './components/BackgroundBlobs';
import HeroSection from './components/HeroSection';
import PhoneDisplay from './components/PhoneDisplay';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import LiveDemoSection from './components/LiveDemoSection';
import CTASection from './components/CTASection';
import './styles/index.css';

function App() {
  const [isTracking, setIsTracking] = useState(false);
  const [time, setTime] = useState(0);
  const [distance, setDistance] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [acceleration, setAcceleration] = useState(0);
  const [velocityHistory, setVelocityHistory] = useState([]);

  useEffect(() => {
    if (!isTracking) return;

    const interval = setInterval(() => {
      setTime(t => {
        const newTime = t + 0.1;
        
        const baseAccel = 0.3;
        const waveAccel = Math.sin(newTime * 0.8) * 0.4;
        const randomAccel = (Math.random() - 0.5) * 0.2;
        const newAccel = baseAccel + waveAccel + randomAccel;
        
        setAcceleration(newAccel);
        
        setVelocity(v => {
          const newVel = Math.max(0, v + newAccel * 0.1);
          return newVel;
        });
        
        setDistance(d => d + velocity * 0.1);

        setVelocityHistory(prev => {
          const updated = [...prev, {
            time: Number(newTime.toFixed(1)),
            velocity: velocity,
            acceleration: newAccel
          }];
          return updated.slice(-100);
        });

        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isTracking, velocity]);

  const handleReset = () => {
    setIsTracking(false);
    setTime(0);
    setDistance(0);
    setVelocity(0);
    setAcceleration(0);
    setVelocityHistory([]);
  };

  const stats = [
    { icon: Clock, label: 'Time', value: `${time.toFixed(2)}s`, unit: 'seconds', color: 'blue' },
    { icon: TrendingUp, label: 'Distance', value: `${distance.toFixed(2)}`, unit: 'meters', color: 'purple' },
    { icon: Gauge, label: 'Velocity', value: `${velocity.toFixed(2)}`, unit: 'm/s', color: 'green' },
    { icon: Zap, label: 'Acceleration', value: `${acceleration.toFixed(2)}`, unit: 'm/s²', color: 'orange' }
  ];

  return (
    <div className="app-container">
      <BackgroundBlobs />
      
      <div className="app-content">
        {/* Hero Section with Phone */}
        <div className="hero-with-phone">
          <HeroSection 
            onStart={() => setIsTracking(!isTracking)}
            isTracking={isTracking}
            onReset={handleReset}
          />
          <PhoneDisplay stats={stats} isTracking={isTracking} />
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Live Demo Section */}
        <LiveDemoSection 
          velocityHistory={velocityHistory}
          isTracking={isTracking}
          onPlay={() => setIsTracking(!isTracking)}
          onReset={handleReset}
        />

        {/* CTA Section */}
        <CTASection />
      </div>
    </div>
  );
}

export default App;