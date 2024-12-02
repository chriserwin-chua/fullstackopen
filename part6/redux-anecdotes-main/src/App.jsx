import { useDispatch } from 'react-redux';
import AnecdoteFilter from './components/AnecdoteFilter';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer';
import { useEffect } from 'react';
import anecdoteService from './services/anecdotes';
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
