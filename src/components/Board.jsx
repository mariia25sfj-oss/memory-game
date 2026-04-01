import Card from "./Card";

export default function Board({ cards, handleClick }) {
  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}