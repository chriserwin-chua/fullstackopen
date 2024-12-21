import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient, useLazyQuery } from '@apollo/client';
import BookRecommendation from './components/BookRecommendation';
import { ALL_BOOKS, BOOK_ADDED, USER_DETAILS } from './queries';
import { useQuery, useMutation, useSubscription } from '@apollo/client';

export const updateCache = (cache, query, bookAdded) => {
  // helper that is used to eliminate saving same book twice
  const uniqueById = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.id;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueById(allBooks.concat(bookAdded)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [user, setUser] = useState();
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const [fetchUser, { data }] = useLazyQuery(USER_DETAILS);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('library-user-token');
    if (localStorageToken) {
      setToken(localStorageToken);
      setPage('authors');
      fetchUser();
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
  }, [data, token]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} has been added by another user.`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
      // client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
      //   return {
      //     allBooks: allBooks.concat(addedBook),
      //   };
      // });
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('reco')}>recommendation</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      {user && (
        <BookRecommendation show={page === 'reco'} genre={user.favoriteGenre} />
      )}

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
