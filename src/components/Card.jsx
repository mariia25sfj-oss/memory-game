export default function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "locked" : ""}`}
      onClick={onClick}
    >
      <div className="card-inner">
        {/* Front side (emoji) */}
        <div className="card-front">{card.emoji}</div>

        {/* Back side */}
        <div className="card-back">🌿</div>
      </div>
    </div>
  );
}