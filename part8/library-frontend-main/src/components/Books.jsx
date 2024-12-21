import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useEffect, useState } from 'react';
const Books = (props) => {
  if (!props.show) {
    return null;
  }
  const [filterGenre, setFilterGenre] = useState();
  //const [filteredBooks, setFilteredBooks] = useState([]);

  //const result = useQuery(ALL_BOOKS);
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: filterGenre },
  });
  // useEffect(() => {
  //   if (filterGenre && !loading && data)
  //     setFilteredBooks(
  //       data.allBooks.filter((book) => book.genres.includes(filterGenre))
  //     );
  // }, [filterGenre, loading, data]);

  if (loading) {
    return 'loading books...';
  }
  const books = data.allBooks;

  if (!books) {
    return null;
  }

  const flattenedGenres = [].concat(
    ...books.map((book) => book.genres.map((genre) => genre))
  );

  const uniqueGenres = [...new Set(flattenedGenres)];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {uniqueGenres.length > 0 &&
        uniqueGenres.map((genre) => {
          return (
            <button key={genre} onClick={() => setFilterGenre(genre)}>
              {genre}
            </button>
          );
        })}
    </div>
  );
};

export default Books;
