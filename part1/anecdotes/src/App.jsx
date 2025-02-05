import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  let randomNumber = Math.floor(Math.random() * 8);
  const [selected, setSelected] = useState(randomNumber);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  const findMaxIndex = (arr) => {
    const maxValue = Math.max(...arr);
    return arr.indexOf(maxValue);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} points</p>
      <br />
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(randomNumber)}>next anecdote</button>
      <br />
      <h1>Anecdote with most votes</h1>
      {anecdotes[findMaxIndex(points)]}
      <p>has {points[findMaxIndex(points)]} points</p>
    </div>
  );
};

export default App;
