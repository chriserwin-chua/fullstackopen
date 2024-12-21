import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Select from 'react-select';
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTHYEAR } from '../queries';

const EditAuthor = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [newBirthYear, setNewBirthYear] = useState('');
  const [error, setError] = useState();
  const options =
    authors &&
    authors.map((author) => {
      return { label: author.name, value: author.name };
    });

  const [updateAuthor] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      setError(messages);
    },
  });
  const handleEdit = (e) => {
    e.preventDefault();
    updateAuthor({
      variables: { name: selectedAuthor, setBornTo: newBirthYear },
    });
    setSelectedAuthor('');
    setNewBirthYear('');
  };
  return (
    <>
      <Select options={options} onChange={(e) => setSelectedAuthor(e.value)} />
      born{' '}
      <input
        value={newBirthYear}
        onChange={(e) => setNewBirthYear(e.target.value)}
      />
      <br />
      <button onClick={handleEdit}>update</button>
    </>
  );
};

export default EditAuthor;
