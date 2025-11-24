function FeatureCard({ icon, title, description, color }) {
  return (
    <div className="feature-card">
      <div className={`feature-icon icon-${color}`}>{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}

export default FeatureCard;