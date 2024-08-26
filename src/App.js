import { useEffect, useState } from 'react';
import './App.css';
import { SingleCard } from './components/SingleCard';
import imgHelmet from './assets/images/helmet-1.png'
import imgPotion from './assets/images/potion-1.png'
import imgRing from './assets/images/ring-1.png'
import imgScroll from './assets/images/scroll-1.png'
import imgShield from './assets/images/shield-1.png'
import imgSword from './assets/images/sword-1.png'

const cartImages = [
  { "src": imgHelmet, matched: false },
  { "src": imgPotion, matched: false },
  { "src": imgRing, matched: false },
  { "src": imgScroll, matched: false },
  { "src": imgShield, matched: false },
  { "src": imgSword, matched: false },
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setdisabled] = useState(false);

  const shuffleCards = () => {
    const shuffleCards = [...cartImages, ...cartImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setdisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setdisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <p>Turns: {turns}</p>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />
        ))}
      </div>
    </div>
  );
}

export default App;
