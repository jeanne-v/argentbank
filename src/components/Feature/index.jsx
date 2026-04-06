export default function Feature({ img, imgAlt, title, text }) {
  return (
    <div className="feature-item">
      <img data-testid="feature-img" src={img} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
}
