import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    [...state.anecdotes].sort((a, b) => b.votes - a.votes)
  );
  const filterText = useSelector((state) => state.filter.filterText);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you have voted for ${anecdote.content}`, 10));
  };

  const filteredAnecdotes =
    filterText !== ''
      ? anecdotes.filter((anecdote) => anecdote.content.includes(filterText))
      : anecdotes;

  return filteredAnecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
