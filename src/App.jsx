import { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

const emojis = ["🐱", "🐶", "🐸", "🦊", "🐼", "🐵"];

const createCards = () => {
  const doubled = [...emojis, ...emojis];

  return doubled
    .map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);
};

export default function App() {
  const [cards, setCards] = useState(createCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const [time, setTime] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || null
  );

  /* ===== TIMER ===== */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* ===== CLICK HANDLER ===== */
  const handleClick = (index) => {
    if (flippedCards.length === 2) return;

    const newCards = [...cards];
    const card = newCards[index];

    if (card.flipped || card.matched) return;

    card.flipped = true;

    setCards(newCards);
    setFlippedCards([...flippedCards, index]);
  };

  /* ===== MATCH CHECK ===== */
useEffect(() => {
  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    const newCards = [...cards];

    if (newCards[first].emoji === newCards[second].emoji) {
      newCards[first].matched = true;
      newCards[second].matched = true;
    } else {
      newCards[first].flipped = false;
      newCards[second].flipped = false;
    }

    setCards(newCards);
    setFlippedCards([]);
    setMoves((m) => m + 1);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [flippedCards, cards]);

  /* ===== WIN CHECK ===== */
  const allMatched = cards.every((c) => c.matched);

  /* ===== SAVE BEST SCORE ===== */
  useEffect(() => {
    if (allMatched) {
      if (!bestScore || moves < bestScore) {
        localStorage.setItem("bestScore", moves);
        setBestScore(moves);
      }
    }
  }, [allMatched, moves, bestScore]);

  /* ===== RESTART ===== */
  const restartGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
  };

  return (
    <div className="app-container">
      <h1>🐾 Zoo Memory Game</h1>

      <p>Moves: {moves}</p>
      <p>Time: {time}s</p>
      <p>Best Score: {bestScore || "—"}</p>

      <button onClick={restartGame}>Restart</button>

      <Board cards={cards} handleClick={handleClick} />

      {allMatched && <h2>🎉 You found all animals!</h2>}
    </div>
  );
}