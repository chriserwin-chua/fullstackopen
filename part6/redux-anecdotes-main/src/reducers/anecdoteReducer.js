import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// export const voteAnecdote = (id) => {
//   return {
//     type: 'VOTE_ANECDOTE',
//     payload: { id },
//   };
// };

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//     },
//   };
// };

//const initialState = anecdotesAtStart.map(asObject);

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state);
//   console.log('action', action);
//   switch (action.type) {
//     case 'NEW_ANECDOTE': {
//       const newAnecdote = {
//         content: action.payload.content,
//         id: getId(),
//         votes: 0,
//       };
//       return [...state, newAnecdote];
//     }
//     case 'VOTE_ANECDOTE': {
//       const anecdote = state.find(
//         (anecdote) => anecdote.id === action.payload.id
//       );
//       const updatedAnecdote = {
//         ...anecdote,
//         votes: anecdote.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== action.payload.id ? anecdote : updatedAnecdote
//       );
//     }
//     default:
//       return state;
//   }
// };

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    // voteAnecdote(state, action) {
    //   const id = action.payload;
    //   const anecdote = state.find((anecdote) => anecdote.id === id);
    //   const updatedAnecdote = {
    //     ...anecdote,
    //     votes: anecdote.votes + 1,
    //   };
    //   return state.map((anecdote) =>
    //     anecdote.id !== id ? anecdote : updatedAnecdote
    //   );
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (content) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote(content);
    dispatch(initializeAnecdotes());
  };
};

export default anecdoteSlice.reducer;
