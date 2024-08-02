import './App.css';
import React, { useState } from 'react';

function App() {

  const [scoreA, setScoreA] = useState(1);
  const [scoreB, setScoreB] = useState(1);
  const [winner, setWinner] = useState('Same Point');
  const [error, setError] = useState('');

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
    }
  };

  const handleReset = () => {
    setScoreA(1);
    setScoreB(1);
    setWinner('Same Point');
    setError('')
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

  const handleInputChangeA = (event) => {
    const value = event.target.value
    if (value > 0 && value <= 10) {
      const newScore = Number(value);
      setScoreA(newScore);
      updateWinner(newScore, scoreB);
      setError('')
    } else {
      setWinner('')
      setError('Exceeds the specified amount (max: 10; min: 1)')
    }
  };

  const handleInputChangeB = (event) => {
    const value = event.target.value
    if (value > 0 && value <= 10) {
      const newScore = Number(event.target.value);
      setScoreB(newScore);
      updateWinner(scoreA, newScore);
      setError('')
    } else {
      setWinner('')
      setError('Exceeds the specified amount')
    }
  };

  return (
    <div className='container'>
      <h2>Max number: 10 & Min number: 1 </h2>
      <h3 style={{ color: 'green' }}>{winner}</h3>
      <h3 style={{ color: 'red' }}>{error}</h3>
      <div className='character'>
        <h4>Character A: {scoreA}</h4>
        <div className='background'>
          {Array.from({ length: scoreA }).map((_, index) => (
            <div key={index} className='property'></div>
          ))}
        </div>
      </div>
      <div className='character'>
        <h4>Character B: {scoreB}</h4>
        <div className='background'>
          {Array.from({ length: scoreB }).map((_, index) => (
            <div key={index} className='property'></div>
          ))}
        </div>
      </div>
      <div className='button'>
        <button className='race' onClick={handleRace} disabled={scoreA >= 10 && scoreB >= 10}>Race</button>
        {(scoreA !== 1 || scoreB !== 1 || error) && <button onClick={handleReset}>Reset</button>}
      </div>

      <div className='input'>
        <div className='character'>
          <h4>Input Character A</h4>
          <input type="number" defaultValue={1} onChange={handleInputChangeA} />
        </div>

        <div className='character'>
          <h4>Input Character B</h4>
          <input type="number" defaultValue={1} onChange={handleInputChangeB} />
        </div>
      </div>
    </div>
  );
}

export default App;
