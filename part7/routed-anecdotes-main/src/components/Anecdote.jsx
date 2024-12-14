import React from 'react';

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        <span>has {anecdote.votes}</span>
        {/* <button onClick={() => handleVote(anecdote)}>vote</button> */}
        <br />
        <span>
          for more info see <a href={anecdote.info}>{anecdote.info}</a>
        </span>
      </div>
    </div>
  );
};

export default Anecdote;
