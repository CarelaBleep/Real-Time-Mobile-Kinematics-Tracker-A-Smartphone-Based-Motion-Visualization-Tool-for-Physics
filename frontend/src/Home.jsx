import React from 'react';

// Styles
import './styles/home/base.css';
import './styles/home/layout.css';
import './styles/home/components.css';
import './styles/home/themes.css';

// Logic
import { useMotionSimulation } from './hooks/useMotionSimulation.js';

// Components & Sections
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import PhoneDisplay from './components/features/PhoneDisplay.jsx';
import FeaturesGrid from './sections/FeaturesGrid.jsx';
import HowItWorks from './sections/HowItWorks.jsx';
import LiveGraph from './components/features/LiveGraph.jsx';
import TeacherSection from './sections/TeacherSection.jsx';

export default function Home() {
  const { motionData, graphData, isTracking, toggleTracking, resetTracking } = useMotionSimulation();

  return (
    <div className="container">
      {/* Header Section */}
      <div className="header-section">
        <Header 
          isTracking={isTracking} 
          onToggle={toggleTracking} 
          onReset={resetTracking} 
        />
        <PhoneDisplay data={motionData} />
      </div>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* How It Works */}
      <HowItWorks />

      {/* Live Graph Demo */}
      <LiveGraph 
        data={graphData} 
        isTracking={isTracking} 
        onToggle={toggleTracking} 
      />

      {/* Teacher Section */}
      <TeacherSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
