import { useEffect, useState } from "react";
import "./App.css";

const cardImages = [
  { src: "https://w7.pngwing.com/pngs/329/480/png-transparent-volleyball-women.png", matched: false },
  { src: "https://pics.craiyon.com/2023-07-11/17344a3fa8974f2285676c7deaf5e42b.webp", matched: false },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHSffXCbOkJFY8S-2v3gFZ4l87wsZWZ7XWg&s", matched: false },
  { src: "https://thumbs.dreamstime.com/b/noble-deer-family-winter-snow-forest-artistic-winter-christmas-landscape-square-format-noble-deer-family-winter-snow-forest-161934660.jpg", matched: false },
  { src: "https://media.istockphoto.com/id/1275135250/photo/big-square-italian-food-pizza-with-melted-mozzarella-cheese-and-tomatoes.jpg?s=612x612&w=0&k=20&c=rYvcnvqVMlUOq3qwAEvJsCvQZqoEIp1LezNssza0i0A=", matched: false },
  { src: "https://di-uploads-pod20.dealerinspire.com/pacificbmw/uploads/2022/04/x7-square.jpg", matched: false },
];
//comment for shiiii

// 🌍 Translations
const translations = {
  en: {
    title: "Memory Game",
    newGame: "New Game",
    moves: "Moves",
    winTitle: "🎉 Congratulations!",
    winText: "You completed the game in",
    playAgain: "Play Again",
    back: "Back Home",
  },
  pl: {
    title: "Gra w Memory",
    newGame: "Nowa gra",
    moves: "Ruchy",
    winTitle: "🎉 Gratulacje!",
    winText: "Ukończyłeś grę w",
    playAgain: "Zagraj ponownie",
    back: "Powrót",
  },
};

function App() {
  const [language, setLanguage] = useState("en");
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
    setGameWon(false);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setGameWon(true);
    }
  }, [cards]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      {/* 🌐 Language + Back */}
      <div className="top-bar">
        <a href="https://3ryk-prog.github.io/3ryk-ProgP" className="back-btn">
          {translations[language].back}
        </a>
        <select
          className="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">🇬🇧 English</option>
          <option value="pl">🇵🇱 Polski</option>
        </select>
      </div>

      <h1>{translations[language].title}</h1>
      <button onClick={shuffleCards}>{translations[language].newGame}</button>

      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div
              className={
                card === choiceOne || card === choiceTwo || card.matched
                  ? "flipped"
                  : ""
              }
              onClick={() => handleChoice(card)}
            >
              <img
                className="front"
                src={card.src}
                alt="front"
                draggable="false"
              />
              <div className="back"></div>
            </div>
          </div>
        ))}
      </div>

      <p className="turns">
        {translations[language].moves}: {turns}
      </p>

      {gameWon && (
        <div className="overlay">
          <div className="win-message">
            <h2>{translations[language].winTitle}</h2>
            <p>
              {translations[language].winText} {turns}{" "}
              {language === "pl" ? "ruchach." : "moves."}
            </p>
            <button onClick={shuffleCards}>
              {translations[language].playAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
