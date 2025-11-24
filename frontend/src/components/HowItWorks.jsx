import StepCard from './StepCard';

function HowItWorks() {
  const steps = [
    { number: 1, title: 'Enable Sensors', description: 'Access device sensors' },
    { number: 2, title: 'Track Motion', description: 'Monitor displacement' },
    { number: 3, title: 'View Data', description: 'Analyze measurements' }
  ];

  return (
    <section className="how-it-works-section">
      <h2 className="heading-2">How It Works</h2>
      <div className="steps-grid">
        {steps.map((step, i) => (
          <StepCard key={i} {...step} />
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;