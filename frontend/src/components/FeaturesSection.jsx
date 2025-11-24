import FeatureCard from './FeatureCard';

function FeaturesSection() {
  const features = [
    { icon: '◉', title: 'Real-time Data', desc: 'Instant measurements and calculations', color: 'blue' },
    { icon: '≈', title: 'Live Visualization', desc: 'Interactive graphs and charts', color: 'purple' },
    { icon: '⚡', title: 'High Precision', desc: 'Accurate sensor readings', color: 'orange' }
  ];

  return (
    <section className="features-section">
      <div className="feature-grid">
        {features.map((feature, i) => (
          <FeatureCard key={i} {...feature} />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;