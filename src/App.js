import './App.css';
import React, { useState } from 'react';

function App() {

  const [scoreA, setScoreA] = useState(1);
  const [scoreB, setScoreB] = useState(1);
  const [winner, setWinner] = useState('Same Point');

  const handleRace = () => {
    if (scoreA < 10 && scoreB < 10) {
      if (Math.random() < 0.5) {
        setScoreA(prev => {
          const newScore = prev + 1;
          updateWinner(newScore, scoreB);
          return newScore;
        });
      } else {
        setScoreB(prev => {
          const newScore = prev + 1;
          updateWinner(scoreA, newScore);
          return newScore;
        });
      }

      console.log(scoreA, '<--->', scoreB)
    }
  };

  const handleReset = () => {
    setScoreA(1);
    setScoreB(1);
    setWinner('Same Point');
  };

  const updateWinner = (scoreA, scoreB) => {
    if (scoreA > scoreB) {
      setWinner('A is Winning');
    } else if (scoreB > scoreA) {
      setWinner('B is Winning');
    } else {
      setWinner('Same Point');
    }
  };

  return (
    <div className='container'>
      <h1>{winner}</h1>
      <div className='character'>
        <h3>Character A</h3>
        <div className='background'>
          {Array.from({ length: scoreA }).map((_, index) => (
            <div key={index} className='property'></div>
          ))}
        </div>
      </div>
      <div className='character'>
        <h3>Character B</h3>
        <div className='background'>
          {Array.from({ length: scoreB }).map((_, index) => (
            <div key={index} className='property'></div>
          ))}
        </div>
      </div>
      <div className='button'>
        <button className='race' onClick={handleRace} disabled={scoreA >= 10 && scoreB >= 10}>Race</button>
        {(scoreA !== 1 || scoreB !== 1) && <button onClick={handleReset}>Reset</button>}
      </div>
    </div>
  );
}

export default App;
