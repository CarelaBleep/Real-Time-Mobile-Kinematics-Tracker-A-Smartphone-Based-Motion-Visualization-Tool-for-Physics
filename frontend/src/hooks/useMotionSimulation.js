import { useState, useEffect } from 'react';

const INITIAL_MOTION_DATA = {
  distance: 0.0,
  velocity: 0.00,
  acceleration: 0.00,
  time: 0.00
};

const getInitialGraphData = () => {
  return Array.from({ length: 50 }, (_, i) => ({ x: i, y: 5 }));
};

export const useMotionSimulation = () => {
  const [motionData, setMotionData] = useState(INITIAL_MOTION_DATA);
  const [isTracking, setIsTracking] = useState(false);
  const [graphData, setGraphData] = useState(getInitialGraphData);

  const resetTracking = () => {
    setIsTracking(false);
    setMotionData(INITIAL_MOTION_DATA);
    setGraphData(getInitialGraphData());
  };

  const toggleTracking = () => setIsTracking(prev => !prev);

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setMotionData(prev => ({
          distance: parseFloat((prev.distance + Math.random() * 0.5).toFixed(1)),
          velocity: parseFloat((Math.random() * 3 + 1).toFixed(2)),
          acceleration: parseFloat((Math.random() * 1.5).toFixed(2)),
          time: parseFloat((prev.time + 0.1).toFixed(2))
        }));

        setGraphData(prev => {
          const newData = prev.slice(1);
          const newY = 5 + (motionData.velocity * 10) + Math.random() * 5; 
          newData.push({
            x: prev[prev.length - 1].x + 1,
            y: newY
          });
          return newData;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTracking, motionData.velocity]);

  return { motionData, graphData, isTracking, toggleTracking, resetTracking };
};
