import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdotes } from '../requests';
import { useNotificationDispatch } from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
  });

  const dispatch = useNotificationDispatch();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate(
      { content: content, votes: 0 },
      {
        onSuccess: () => {
          dispatch({
            type: 'ADD_NOTIFICATION_TEXT',
            payload: `${content} has been created.`,
          });
        },
        onError: () => {
          dispatch({
            type: 'ADD_NOTIFICATION_TEXT',
            payload: 'anecdote too short, must have length of 5 or more.',
          });
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
