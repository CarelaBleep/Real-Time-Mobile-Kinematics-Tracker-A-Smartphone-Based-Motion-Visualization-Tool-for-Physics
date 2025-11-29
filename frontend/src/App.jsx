import { useState, useEffect } from 'react';
import Home from './components/Home.jsx';
import Sender from './components/Sender.jsx';
import Receiver from './components/Receiver.jsx';
import './index.css';

export default function App() {
  const [view, setView] = useState('home');

  useEffect(() => {
    // Only create the shared background when not on the Home component
    if (view === 'home') return;

    const container = document.querySelector('.physics-background');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 400}px`);
      particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 400}px`);
      particle.style.animationDelay = `${Math.random() * 20}s`;
      particle.style.animationDuration = `${15 + Math.random() * 10}s`;
      container.appendChild(particle);
    }

    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div');
      line.className = 'velocity-line';
      line.style.top = `${10 + i * 12}%`;
      line.style.left = `${-20}%`;
      line.style.width = `${40 + Math.random() * 60}px`;
      line.style.animationDelay = `${i * 1}s`;
      container.appendChild(line);
    }

    for (let i = 0; i < 4; i++) {
      const wave = document.createElement('div');
      wave.className = 'wave-line';
      wave.style.top = `${20 + i * 20}%`;
      wave.style.animationDuration = `${12 + i * 3}s`;
      wave.style.animationDelay = `${i * -3}s`;
      container.appendChild(wave);
    }

    for (let i = 0; i < 3; i++) {
      const orbit = document.createElement('div');
      orbit.className = 'orbit';
      const size = 100 + i * 80;
      orbit.style.width = `${size}px`;
      orbit.style.height = `${size}px`;
      orbit.style.left = `${20 + i * 25}%`;
      orbit.style.top = `${30 + i * 15}%`;
      orbit.style.animationDuration = `${20 + i * 10}s`;
      orbit.style.animationDirection = i % 2 === 0 ? 'normal' : 'reverse';
      
      const orbitParticle = document.createElement('div');
      orbitParticle.className = 'orbit-particle';
      orbitParticle.style.setProperty('--orbit-radius', `${size / 2}px`);
      orbitParticle.style.animationDuration = `${5 + i * 2}s`;
      orbit.appendChild(orbitParticle);
      
      container.appendChild(orbit);
    }

    for (let i = 0; i < 6; i++) {
      const arrow = document.createElement('div');
      arrow.className = 'acceleration-arrow';
      arrow.style.left = `${5 + i * 15}%`;
      arrow.style.top = `${60 + (i % 3) * 10}%`;
      arrow.style.animationDelay = `${i * 0.7}s`;
      container.appendChild(arrow);
    }

    return () => {
      container.innerHTML = '';
    };
  }, [view]);

  const renderView = () => {
    if (view === 'home') {
      return <Home onNavigate={setView} />;
    }

    return (
      <div className="app">
        <div className="physics-background">
          <div className="physics-grid"></div>
        </div>
        <div className="panel-left">
          <div>
            <button 
              onClick={() => setView('home')}
              className="btn btn-ghost"
              style={{ marginBottom: '20px' }}
            >
              ← Back to Home
            </button>
            <h1 className="brand-title">Physics Motion Tracker</h1>
            <p className="lead">Measure distance, velocity, acceleration, and time through any cell-smart phone.</p>

            <div className="controls">
              <button
                onClick={() => setView('sender')}
                className={"btn " + (view === 'sender' ? 'btn-primary' : 'btn-secondary')}
              >
                Sender (Phone)
              </button>
              <button
                onClick={() => setView('receiver')}
                className={"btn " + (view === 'receiver' ? 'btn-primary' : 'btn-secondary')}
              >
                Receiver (Laptop)
              </button>
            </div>
          </div>
        </div>

        <div className="panel-right">
          {view === 'sender' ? <Sender /> : <Receiver />}
        </div>
      </div>
    );
  };

  return renderView();
}
