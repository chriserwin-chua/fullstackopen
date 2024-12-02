import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, voteAnecdote } from './requests';
import { useNotificationDispatch } from './contexts/NotificationContext';
const App = () => {
  const queryClient = useQueryClient();
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });
  const dispatch = useNotificationDispatch();
  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    voteAnecdoteMutation.mutate(updatedAnecdote);
    dispatch({
      type: 'ADD_NOTIFICATION_TEXT',
      payload: `You have voted on ${updatedAnecdote.content}`,
    });
  };

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.status === 'error') {
    return <div>Anecdote service currently not available.</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
